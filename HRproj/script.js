const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const mainContent = document.querySelector('.main-content');
const darkModeIcon = darkModeToggle.querySelector('i');

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.remove('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }
}

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
});

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');

    if (darkModeIcon) {
        if (isDarkMode) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }
});

const cards = document.querySelectorAll('.overview-cards .card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        card.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.08)';
        card.style.transform = 'translateY(0)';
    });
});

window.addEventListener('load', () => {
    body.classList.add('loaded');
});

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme);

document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.getElementById('notificationBell');
    const notificationCard = document.getElementById('notificationCard');

    if (notificationBell && notificationCard) {
        notificationBell.addEventListener('click', function(event) {
            event.stopPropagation(); // to prevent immediate closing of card from click
            notificationCard.classList.toggle('show-notifications');
        });

        // to close notif card when clicked on screen out of it
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.notification')) {
                notificationCard.classList.remove('show-notifications');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeForm = document.querySelector('.add-employee-form');
    if (addEmployeeForm) {
        addEmployeeForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const employeeName = document.getElementById('employee_name').value;
            const dateOfJoining = document.getElementById('date_of_joining').value;
            const dateOfBirth = document.getElementById('date_of_birth').value;
            const age = document.getElementById('age').value;
            const bloodGroup = document.getElementById('blood_group').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const emergencyContact1 = document.getElementById('emergency_contact_1').value;
            const emergencyContact2 = document.getElementById('emergency_contact_2').value;
            const medicalHistory = document.getElementById('medical_history').value;
            const address = document.getElementById('address').value;
            const designation = document.getElementById('designation').value;
            const department = document.getElementById('department').value;
            const paidLeavesUsed = parseInt(document.getElementById('paid_leaves_used').value);
            const paidLeavesRemaining = parseInt(document.getElementById('paid_leaves_remaining').value);
            const overtimeHoursCompleted = parseInt(document.getElementById('overtime_hours_completed').value);
            const salary = parseFloat(document.getElementById('salary').value);
            const overtimeBonus = parseFloat(document.getElementById('overtime_bonus').value);

            const employeeData = {
                employee_name: employeeName,
                date_of_joining: dateOfJoining,
                date_of_birth: dateOfBirth,
                age: age ? parseInt(age) : null,
                blood_group: bloodGroup,
                email: email,
                phone: phone,
                emergency_contact_1: emergencyContact1,
                emergency_contact_2: emergencyContact2,
                medical_history: medicalHistory,
                address: address,
                designation: designation,
                department: department,
                paid_leaves_used: paidLeavesUsed,
                paid_leaves_remaining: paidLeavesRemaining,
                overtime_hours_completed: overtimeHoursCompleted,
                salary: salary,
                overtime_bonus: overtimeBonus,
            };

            db.collection('employees')
                .add(employeeData)
                .then((docRef) => {
                    console.log('Employee data added with ID: ', docRef.id);
                    alert('Employee added successfully!');
                    addEmployeeForm.reset(); // to clear the form
                })
                .catch((error) => {
                    console.error('Error adding employee data: ', error);
                    alert('Error adding employee. Please try again.');
                });
        });
    }
});
