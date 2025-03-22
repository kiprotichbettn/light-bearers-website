// Dynamic Greeting based on Time of Day
const currentHour = new Date().getHours();
let greetingMessage = "Good Day!";

if (currentHour < 12) {
    greetingMessage = "Good Morning!";
} else if (currentHour < 18) {
    greetingMessage = "Good Afternoon!";
} else {
    greetingMessage = "Good Evening!";
}

document.getElementById("greeting").textContent = greetingMessage + " Empowering Students for Social, Economic, and Academic Growth";

// Interactive Program 
const programDetails = {
    academic: "Our Academic Support program helps students with tutoring, study groups, and test prep.",
    career: "Our Career Development program offers workshops on resumes, interviews, and job search strategies.",
    community: "We organize community outreach programs to help students give back and engage with their local area.",
    mentorship: "Our Mentorship program pairs students with industry professionals to guide their career paths."
};

document.querySelectorAll('.program-btn').forEach(button => {
    button.addEventListener('click', function() {
        const programType = this.getAttribute('data-program');
        document.getElementById('program-details').textContent = programDetails[programType];
    });
});
