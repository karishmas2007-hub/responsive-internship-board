
// ==========================================
// INTERNSHIP DATA
// ==========================================

const internships = [
    {
        id: "INT-101",
        title: "Frontend Intern",
        domain: "Full Stack Development",
        mode: "Remote",
        location: "India",
        skills: ["HTML", "CSS", "JavaScript"],
        openings: 3
    },
    {
        id: "INT-102",
        title: "API Engineering Intern",
        domain: "Full Stack Development",
        mode: "Hybrid",
        location: "Pune",
        skills: ["Node.js", "SQL", "Testing"],
        openings: 2
    },
    {
        id: "INT-103",
        title: "UI/UX Intern",
        domain: "UI/UX",
        mode: "Remote",
        location: "India",
        skills: ["Figma", "Research", "Accessibility"],
        openings: 1
    },
    {
        id: "INT-104",
        title: "Data Analyst Intern",
        domain: "Data Analytics",
        mode: "On-site",
        location: "Bengaluru",
        skills: ["Excel", "SQL", "Data Visualization"],
        openings: 2
    },
    {
        id: "INT-105",
        title: "Security Operations Intern",
        domain: "Cyber Security",
        mode: "Remote",
        location: "India",
        skills: ["Linux", "Logs", "Networking"],
        openings: 1
    }
];


// ==========================================
// HTML ELEMENTS
// ==========================================

const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");
const internshipList = document.getElementById("internshipList");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");


// ==========================================
// DISPLAY INTERNSHIP CARDS
// ==========================================

function displayInternships(data) {

    try {

        internshipList.innerHTML = "";

        if (!Array.isArray(data)) {
            throw new Error("Invalid internship data");
        }

        data.forEach((internship) => {

            const card = document.createElement("article");
            card.className = "internship-card";

            const title = document.createElement("h3");
            title.textContent = internship.title;

            const id = document.createElement("p");
            id.textContent = "Internship ID: " + internship.id;

            const domain = document.createElement("p");
            domain.textContent = "Domain: " + internship.domain;

            const mode = document.createElement("p");
            mode.textContent = "Mode: " + internship.mode;

            const location = document.createElement("p");
            location.textContent = "Location: " + internship.location;

            const openings = document.createElement("p");
            openings.textContent = "Openings: " + internship.openings;

            const skills = document.createElement("p");
            skills.textContent =
                "Skills: " + internship.skills.join(", ");

            const domainTag = document.createElement("span");
            domainTag.className = "domain-tag";
            domainTag.textContent = internship.domain;

            card.append(
                title,
                id,
                domain,
                mode,
                location,
                openings,
                skills,
                domainTag
            );

            internshipList.appendChild(card);

        });

        resultCount.textContent =
            data.length + (data.length === 1
                ? " internship found"
                : " internships found");

        emptyMessage.hidden = data.length !== 0;
        errorMessage.hidden = true;

    } catch (error) {

        console.error("Display error:", error);

        internshipList.innerHTML = "";
        resultCount.textContent = "";
        emptyMessage.hidden = true;
        errorMessage.hidden = false;

    }
}


// ==========================================
// SEARCH AND FILTER FUNCTION
// ==========================================

function filterInternships() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainFilter.value;

    const filteredInternships = internships.filter((internship) => {

        const searchableText = [
            internship.title,
            internship.domain,
            internship.location,
            internship.mode,
            ...internship.skills
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesDomain =
            selectedDomain === "all" ||
            internship.domain === selectedDomain;

        return matchesSearch && matchesDomain;

    });

    displayInternships(filteredInternships);

}


// ==========================================
// EVENT LISTENERS
// ==========================================

searchInput.addEventListener("input", filterInternships);

domainFilter.addEventListener("change", filterInternships);


// ==========================================
// INITIAL PAGE LOAD
// ==========================================

displayInternships(internships);
