import { readFileCustom } from "../utils/read-helper.js"
import { writeFileCustom } from "../utils/write-helper.js"

export default {
    STUDENT_PAGE: (_, res) => {
        const allStudents = readFileCustom('students.json')
        res.render('students.ejs', { allStudents })
    },
    CREATE_STUDENT: (req, res) => {
        const { name, surename } = req.body

        const allStudents = readFileCustom('students.json')

        if (allStudents.find(student => student.name == name)) {
            return res.status(400).json({
                message: "Student already exists"
            })
        } else {
            allStudents.push({
                id: allStudents.at(-1)?.id + 1 || 1,
                name,
                surename
            })

            writeFileCustom('students.json', allStudents)

            res.redirect('/api/main')
        }
    },
    UPDATE_STUDENT: (req, res) => {
        const { id } = req.params
        const { name, surename } = req.body

        if (!name || !surename) {
            return res.status(400).json({ message: "Student name and surename are required" });
        }

        const allStudents = readFileCustom('students.json')

        const studentIndex = allStudents.findIndex(student => student.id == +id)

        if (studentIndex == -1) {
            return res.status(404).json({
                message: "Student not found"
            })
        } else {
            allStudents[studentIndex] = {
                id: +id,
                name,
                surename
            }

            writeFileCustom('students.json', allStudents)

            res.redirect('/api/main');
        }
    },

    DELETE_STUDENT: (req, res) => {
        const { id } = req.params

        const allStudents = readFileCustom('students.json')

        const studentIndex = allStudents.findIndex(st => st.id == id)

        if (studentIndex == -1) {
            return res.status(404).json({
                message: "Student not found"
            })
        } else {
            allStudents.splice(studentIndex, 1)

            writeFileCustom('students.json', allStudents)

            res.redirect('/api/main')
        }
    }
}
