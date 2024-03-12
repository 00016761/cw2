const editButtons = document.querySelectorAll('.edit-button');
const deleteButtons = document.querySelectorAll('.delete-button');

editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const groupItem = button.closest('.single_student');
        const paragraphName = groupItem.querySelector('.name p');
        const inputName = groupItem.querySelector('.name input');
        const paragraphSurname = groupItem.querySelector('.surename p');
        const inputSurname = groupItem.querySelector('.surename input');
        const saveButton = groupItem.querySelector('.save-button');

        paragraphName.style.display = 'none';
        inputName.style.display = 'inline-block';
        paragraphSurname.style.display = 'none';
        inputSurname.style.display = 'inline-block';
        button.style.display = 'none';
        saveButton.style.display = 'inline-block';

        saveButton.addEventListener('click', () => {
            paragraphName.textContent = inputName.value;
            inputName.style.display = 'none';
            paragraphName.style.display = 'inline-block';
            paragraphSurname.textContent = inputSurname.value;
            inputSurname.style.display = 'none';
            paragraphSurname.style.display = 'inline-block';
            button.style.display = 'inline-block';
            saveButton.style.display = 'none';

            const id = groupItem.getAttribute('student-id');
            const name = inputName.value;
            const surename = inputSurname.value;

            console.log({ id, name, surename });

            fetch(`/api/student/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surename })
            });
        });
    });
});

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const groupItem = button.closest('.single_student');
        const id = groupItem.getAttribute('student-id');

        fetch(`/api/student/${id}`, {
            method: 'DELETE'
        });

        groupItem.remove();
    });
});
