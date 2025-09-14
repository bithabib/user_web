document.addEventListener("DOMContentLoaded", function () {

    const usersTableBody = document.getElementById('usersTableBody');
    const addUserForm = document.getElementById('addUserForm');

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    const editForm = document.getElementById('editForm');
    const deleteForm = document.getElementById('deleteForm');

    let currentUserId = null;

    // ---------- FETCH USERS ----------
    async function fetchUsers() {
        const res = await fetch('/api/users');
        const users = await res.json();
        usersTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><button class="btn btn-info btn-sm edit-btn">Edit</button></td>
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
            `;

            // Edit button
            row.querySelector('.edit-btn').addEventListener('click', () => {
                currentUserId = user.id;
                document.getElementById('editId').value = user.id;
                document.getElementById('editFirstName').value = user.firstName;
                document.getElementById('editLastName').value = user.lastName;
                document.getElementById('editAge').value = user.age;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editRole').value = user.role;

                editModal.show();
            });

            // Delete button
            row.querySelector('.delete-btn').addEventListener('click', () => {
                currentUserId = user.id;
                document.getElementById('deleteId').value = user.id;
                document.getElementById('deleteFirstName').textContent = user.firstName;
                document.getElementById('deleteLastName').textContent = user.lastName;
                document.getElementById('deleteAge').textContent = user.age;
                document.getElementById('deleteEmail').textContent = user.email;
                document.getElementById('deleteRole').textContent = user.role;

                deleteModal.show();
            });

            usersTableBody.appendChild(row);
        });
    }

    // ---------- ADD USER ----------
    addUserForm.addEventListener('submit', async e => {
        e.preventDefault();

        const user = {
            firstName: document.getElementById('addFirstName').value,
            lastName: document.getElementById('addLastName').value,
            age: document.getElementById('addAge').value,
            email: document.getElementById('addEmail').value,
            password: document.getElementById('addPassword').value,
            role: document.getElementById('addRole').value
        };

        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        addUserForm.reset();
        document.getElementById('allUsersTab').classList.add('active');
        document.getElementById('newUserTab').classList.remove('active');
        document.getElementById('addUserFormContainer').style.display = 'none';
        document.getElementById('usersTableContainer').style.display = 'block';
        fetchUsers();
    });

    // ---------- UPDATE USER ----------
    editForm.addEventListener('submit', async e => {
        e.preventDefault();

        const user = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            age: document.getElementById('editAge').value,
            email: document.getElementById('editEmail').value,
            role: document.getElementById('editRole').value
        };

        await fetch(`/api/users/${currentUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        editModal.hide();
        fetchUsers();
    });

    // ---------- DELETE USER ----------
    deleteForm.addEventListener('submit', async e => {
        e.preventDefault();

        await fetch(`/api/users/${currentUserId}`, {
            method: 'DELETE'
        });

        deleteModal.hide();
        fetchUsers();
    });

    // Initial fetch
    fetchUsers();

    // Tab switching
    const allUsersTab = document.getElementById('allUsersTab');
    const newUserTab = document.getElementById('newUserTab');
    const addUserFormContainer = document.getElementById('addUserFormContainer');
    const usersTableContainer = document.getElementById('usersTableContainer');

    allUsersTab.addEventListener('click', e => {
        e.preventDefault();
        allUsersTab.classList.add('active');
        newUserTab.classList.remove('active');
        addUserFormContainer.style.display = 'none';
        usersTableContainer.style.display = 'block';
    });

    newUserTab.addEventListener('click', e => {
        e.preventDefault();
        newUserTab.classList.add('active');
        allUsersTab.classList.remove('active');
        addUserFormContainer.style.display = 'block';
        usersTableContainer.style.display = 'none';
    });

});
