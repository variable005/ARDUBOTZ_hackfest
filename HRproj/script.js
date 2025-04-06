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
            event.stopPropagation();
            notificationCard.classList.toggle('show-notifications');
        });

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

            console.log("Employee data to be added:", employeeData); // Placeholder
            alert('Employee data to be added (check console)');
            addEmployeeForm.reset();
        });
    }
});

// Chatbot JavaScript
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
const chatbotContainer = document.getElementById('chatbotContainer');

chatbotToggleBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('collapsed');
    const icon = chatbotToggleBtn.querySelector('i');
    if (chatbotContainer.classList.contains('collapsed')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
});

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase().trim();

    if (userMessage === "where can i find the company's policy on performance reviews?") {
        return "You can find the company's official Performance Review Policy document in the *HR Resources* section of the platform. Navigate to *Company Policies* and look for the document titled 'Employee Performance Review Policy' or similar. It outlines the process, timelines, and guidelines for conducting performance reviews.";
    } else if (userMessage === "how do i initiate the annual performance review cycle for all employees?") {
        return "To initiate the annual performance review cycle, please go to the *Performance Management* module. Under the 'Review Cycles' section, you should see an option to 'Start New Review Cycle'. Follow the on-screen prompts to configure the cycle, including setting the review period, timelines for self-assessments, manager reviews, and feedback stages. You can select 'All Employees' to apply the cycle company-wide.";
    } else if (userMessage === "can i track the completion status of performance reviews across different departments?") {
        return "Yes, you can track the completion status of performance reviews. In the *Performance Management* module, navigate to the 'Review Cycle Dashboard' or 'Progress Tracking' section. Here, you can filter by department, review stage (e.g., self-assessment, manager review), and completion status to get a real-time overview of progress across the organization.";
    } else if (userMessage === "how do i generate a report on average performance ratings for a specific team?") {
        return "To generate a report on average performance ratings, go to the *Reporting & Analytics* section within the *Performance Management* module. Look for a report option like 'Performance Rating Summary' or 'Team Performance Overview'. You will typically be able to filter this report by specific teams, review cycles, and performance metrics to get the data you need. You can then export this report in various formats like CSV or Excel.";
    } else if (userMessage === "what are the recommended steps for handling an employee who consistently receives low performance ratings?") {
        return "The recommended steps for handling an employee with consistently low performance ratings are outlined in the *Performance Improvement Policy, which can be found in the **HR Resources* under *Company Policies*. Generally, it involves: reviewing past performance data and feedback; having a direct conversation with the employee to understand the challenges; developing a Performance Improvement Plan (PIP) with clear, measurable goals and timelines; providing regular support and monitoring progress; documenting all steps taken. Please refer to the full policy for detailed guidance and HR's involvement in this process.";
    } else if (userMessage === "how can i customize the performance review form for different job roles?") {
        return "You can customize the performance review form in the *Performance Management* module under 'Form Templates' or 'Review Settings'. Here, you should have options to create new templates or modify existing ones. You can typically add, remove, and rearrange sections and questions based on specific job role requirements. Ensure you save your changes and assign the appropriate templates to the relevant job roles.";
    } else if (userMessage === "tell me a joke") {
        return "Why don't scientists trust atoms? Because they make up everything!";
    } else if (userMessage === "hello" || userMessage === "hi") {
        return "Hello there! How can I assist you today?";
    } else if (userMessage === "where do i check the attendance of employees?") {
        return "You can head on to the Attendance tab to review the attendance of each individual employee.";
    } else if (userMessage === "where are all the tasks being undertaken by employees?") {
        return "You can head on to the Attendance tab to review the attendance of each individual employee.";
    } else {
        return "I'm sorry, I don't have information on that topic. Could you please ask something else?";
    }
}

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        appendMessage('user', message);
        userInput.value = '';
        const botResponse = getBotResponse(message);
        setTimeout(() => {
            appendMessage('bot', botResponse);
        }, 500);
    }
});

userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
