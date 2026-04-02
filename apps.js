// Global variables
let currentStep = 1;
let selectedProgramme = '';
let selectedAILevel = null;

// AI Level information from the guide
const aiLevelInfo = {
    0: {
        icon: '🚫',
        level: '0 NO AI Use',
        description: 'The assignment must be completed entirely without AI assistance. Students demonstrate independent thinking, knowledge, and skills, and AI must not be used at any stage during the assessment.',
        examples: '- IB assessments (IA, EE, TOK essay, reflective project, language orals, etc.)\n- In-class GESS assessments\n- Personal journal reflections\n- Situations where teacher feedback is limited to one round',
        disclosure: 'No disclosure is required. May require an academic integrity statement that AI was not used.'
    },
    1: {
        icon: '💡',
        level: '1 AI-Assisted Idea Generation, Structuring & Feedback',
        description: 'AI may be used to brainstorm, outline, plan, or provide feedback to improve work, but no AI-generated content appears in the final submission.',
        examples: '- Asking AI for counterarguments to discover viewpoints and positions that they may not have considered\n- Generating possible EE essay structures (must be adapted by student)\n- Feedback from AI on practice essays, e.g. English or Geo (non-assessed stage)',
        disclosure: 'Submit a short statement explaining how AI was used. Include prompt(s) or screenshots.'
    },
    2: {
        icon: '✏️',
        level: '2 AI-Assisted Editing',
        description: 'AI is used to improve clarity, grammar, flow, or tone of student-created work. No new content can be created by AI.',
        examples: '- Using Grammarly to check sentence structure on a practice History essay\n- Asking AI to simplify sentence construction or improve transitions\n- Ask AI to generate word lists for a specific topic',
        disclosure: 'Submit a short statement explaining how AI was used. Include prompt(s) or tool(s) used.'
    },
    3: {
        icon: '🤖',
        level: '3 AI Creation',
        description: 'AI is used to complete parts of an assignment as defined by the teacher. Students are responsible for evaluating and editing AI output.',
        examples: '- Generating interview questions in a career inquiry (with editing)\n- Summarising multiple perspectives in a discussion (fact-checked)\n- Using DALL·E to visualize potential spatial layouts or lighting effects for an installation idea in Visual Arts',
        disclosure: 'MLA citation of all AI-generated content. Submit prompts/screenshots used.'
    },
    4: {
        icon: '🚀',
        level: '4 Full AI Use with Human Oversight',
        description: 'AI can support all stages of the task, but students remain responsible for editing, fact-checking, and ensuring originality. AI is a "co-pilot," not the author.',
        examples: '- Building concept maps with AI for exhibitions\n- Building revision materials such as flashcards, mind maps, or quiz sets with AI, then reviewing and correcting errors.\n- Using AI to explain underlying concepts and revise explanations',
        disclosure: 'MLA citations are required. Disclose all AI use with prompts, tool names, and edits made.'
    }
};

// Subject lists for each programme
const subjects = {
    'MYP': [
        'Language and Literature',
        'Language Acquisition',
        'Individuals and Societies',
        'Sciences',
        'Mathematics',
        'Arts',
        'Physical and Health Education',
        'Design'
    ],
    'DP': [
        'Language A: Literature',
        'Language A: Language and Literature',
        'Language B',
        'Individuals and Societies',
        'Sciences',
        'Mathematics',
        'Arts'
    ],
    'CP': [
        'Language and Literature',
        'Language Acquisition',
        'Individuals and Societies',
        'Sciences',
        'Mathematics',
        'Arts',
        'Career-related Study'
    ]
};

// Grade options for each programme
const grades = {
    'MYP': ['6', '7', '8', '9', '10'],
    'DP': ['Grade 11', 'Grade 12'],
    'CP': ['Grade 11', 'Grade 12']
};

// Criteria for MYP subjects
const mypCriteria = {
    'Language and Literature': [
        { name: 'Criterion A', description: 'Analyzing', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion B', description: 'Organizing', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Producing text', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion D', description: 'Using language', strands: ['i', 'ii', 'iii', 'iv', 'v'] }
    ],
    'Language Acquisition': [
        { name: 'Criterion A', description: 'Comprehending spoken and visual text', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion B', description: 'Comprehending written and visual text', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Communicating in response to spoken and/or written and/or visual text', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion D', description: 'Using language in spoken and/or written form', strands: ['i', 'ii', 'iii'] }
    ],
    'Individuals and Societies': [
        { name: 'Criterion A', description: 'Knowing and understanding', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion B', description: 'Investigating', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion C', description: 'Communicating', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion D', description: 'Thinking critically', strands: ['i', 'ii', 'iii'] }
    ],
    'Sciences': [
        { name: 'Criterion A', description: 'Knowing and understanding', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion B', description: 'Inquiring and designing', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Processing and evaluating', strands: ['i', 'ii', 'iii', 'iv', 'v'] },
        { name: 'Criterion D', description: 'Reflecting on the impacts of science', strands: ['i', 'ii', 'iii'] }
    ],
    'Mathematics': [
        { name: 'Criterion A', description: 'Knowing and understanding', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion B', description: 'Investigating patterns', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Communicating', strands: ['i', 'ii', 'iii', 'iv', 'v'] },
        { name: 'Criterion D', description: 'Applying mathematics in real-life contexts', strands: ['i', 'ii', 'iii'] }
    ],
    'Arts': [
        { name: 'Criterion A', description: 'Knowing and understanding', strands: ['i', 'ii'] },
        { name: 'Criterion B', description: 'Developing skills', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Thinking creatively', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion D', description: 'Responding', strands: ['i', 'ii', 'iii'] }
    ],
    'Physical and Health Education': [
        { name: 'Criterion A', description: 'Knowing and understanding', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion B', description: 'Planning for performance', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion C', description: 'Applying and performing', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion D', description: 'Reflecting and improving performance', strands: ['i', 'ii', 'iii'] }
    ],
    'Design': [
        { name: 'Criterion A', description: 'Inquiring and analyzing', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion B', description: 'Developing ideas', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Creating the solution', strands: ['i', 'ii', 'iii', 'iv'] },
        { name: 'Criterion D', description: 'Evaluating', strands: ['i', 'ii', 'iii', 'iv'] }
    ]
};

// Criterion descriptors
const criterionDescriptors = {
    'Criterion A': {
        '0': 'The student does not reach a standard described by any of the descriptors below.',
        '1-2': 'The student: i. provides limited analysis of the content, context, language, structure, technique and style of text(s) and the relationship among texts ii. provides limited analysis of the effects of the creator\'s choices on an audience iii. rarely justifies opinions and ideas with examples or explanations; uses little or no terminology iv. evaluates few similarities and differences by making minimal connections in features across and within genres and texts.',
        '3-4': 'The student: i. provides adequate analysis of the content, context, language, structure, technique and style of text(s) and the relationship among texts ii. provides adequate analysis of the effects of the creator\'s choices on an audience iii. justifies opinions and ideas with some examples and explanations, though this may not be consistent; uses some terminology iv. evaluates some similarities and differences by making adequate connections in features across and within genres and texts.',
        '5-6': 'The student: i. competently analyses the content, context, language, structure, technique, style of text(s) and the relationship among texts ii. competently analyses the effects of the creator\'s choices on an audience iii. sufficiently justifies opinions and ideas with examples and explanations; uses accurate terminology iv. evaluates similarities and differences by making substantial connections in features across and within genres and texts.',
        '7-8': 'The student: i. provides perceptive analysis of the content, context, language, structure, technique, style of text(s) and the relationship among texts ii. perceptively analyses the effects of the creator\'s choices on an audience iii. gives detailed justification of opinions and ideas with a range of examples, and thorough explanations; uses accurate terminology iv. perceptively compares and contrasts by making extensive connections in features across and within genres and texts'
    },
    'Criterion B': {
        '0': 'The student does not reach a standard described by any of the descriptors below.',
        '1-2': 'The student: i. makes minimal use of organizational structures though these may not always serve the context and intention ii. organizes opinions and ideas with a minimal degree of coherence and logic iii. makes minimal use of referencing and formatting tools to create a presentation style that may not always be suitable to the context and intention.',
        '3-4': 'The student: i. makes adequate use of organizational structures that serve the context and intention ii. organizes opinions and ideas with some degree of coherence and logic iii. makes adequate use of referencing and formatting tools to create a presentation style suitable to the context and intention.',
        '5-6': 'The student: i. makes competent use of organizational structures that serve the context and intention ii. organizes opinions and ideas in a coherent and logical manner with ideas building on each other iii. makes competent use of referencing and formatting tools to create a presentation style suitable to the context and intention.',
        '7-8': 'The student: i. makes sophisticated use of organizational structures that serve the context and intention effectively ii. effectively organizes opinions and ideas in a sustained, coherent and logical manner with ideas building on each other in a sophisticated way iii. makes excellent use of referencing and formatting tools to create an effective presentation style.'
    },
    'Criterion C': {
        '0': 'The student does not reach a standard described by any of the descriptors below.',
        '1-2': 'The student: i. produces texts that demonstrate limited personal engagement with the creative process; demonstrates a limited degree of insight, imagination and sensitivity and minimal exploration of, and critical reflection on, new perspectives and ideas ii. makes minimal stylistic choices in terms of linguistic, literary and visual devices, demonstrating limited awareness of impact on an audience iii. selects few relevant details and examples to develop ideas.',
        '3-4': 'The student: i. produces texts that demonstrate adequate personal engagement with the creative process; demonstrates some insight, imagination and sensitivity and some exploration of, and critical reflection on, new perspectives and ideas ii. makes some stylistic choices in terms of linguistic, literary and visual devices, demonstrating adequate awareness of impact on an audience iii. selects some relevant details and examples to develop ideas.',
        '5-6': 'The student: i. produces texts that demonstrate considerable personal engagement with the creative process; demonstrates considerable insight, imagination and sensitivity and substantial exploration of, and critical reflection on, new perspectives and ideas ii. makes thoughtful stylistic choices in terms of linguistic, literary and visual devices, demonstrating good awareness of impact on an audience iii. selects sufficient relevant details and examples to develop ideas.',
        '7-8': 'The student: i. produces texts that demonstrate a high degree of personal engagement with the creative process; demonstrates a high degree of insight, imagination and sensitivity and perceptive exploration of, and critical reflection on, new perspectives and ideas ii. makes perceptive stylistic choices in terms of linguistic, literary and visual devices, demonstrating good awareness of impact on an audience iii. selects extensive relevant details and examples to develop ideas with precision.'
    },
    'Criterion D': {
        '0': 'The student does not reach a standard described by any of the descriptors below.',
        '1-2': 'The student: i. uses a limited range of appropriate vocabulary and forms of expression ii. writes and speaks in an inappropriate register and style that do not serve the context and intention iii. uses grammar, syntax and punctuation with limited accuracy; errors often hinder communication iv. spells/writes and pronounces with limited accuracy; errors often hinder communication v. makes limited and/or inappropriate use of non-verbal communication techniques.',
        '3-4': 'The student: i. uses an adequate range of appropriate vocabulary, sentence structures and forms of expression ii. sometimes writes and speaks in a register and style that serve the context and intention iii. uses grammar, syntax and punctuation with some degree of accuracy; errors sometimes hinder communication iv. spells/writes and pronounces with some degree of accuracy; errors sometimes hinder communication v. makes some use of appropriate non-verbal communication techniques.',
        '5-6': 'The student: i. uses a varied range of appropriate vocabulary, sentence structures and forms of expression competently ii. writes and speaks competently in a register and style that serve the context and intention iii. uses grammar, syntax and punctuation with a considerable degree of accuracy; errors do not hinder effective communication iv. spells/writes and pronounces with a considerable degree of accuracy; errors do not hinder effective communication v. makes sufficient use of appropriate non-verbal communication techniques.',
        '7-8': 'The student: i. effectively uses a range of appropriate vocabulary, sentence structures and forms of expression ii. writes and speaks in a consistently appropriate register and style that serve the context and intention iii. uses grammar, syntax and punctuation with a high degree of accuracy; errors are minor and communication is effective iv. spells/writes and pronounces with a high degree of accuracy; errors are minor and communication is effective v. makes effective use of appropriate non-verbal communication techniques.'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Programme button listeners using event delegation
    document.querySelector('.programme-selection').addEventListener('click', function(e) {
        const btn = e.target.closest('.programme-btn');
        if (btn) {
            const programme = btn.getAttribute('data-programme');
            selectProgramme(programme, btn);
        }
    });
    
    // AI level button listeners using event delegation
    document.querySelector('.ai-level-container').addEventListener('click', function(e) {
        const btn = e.target.closest('.ai-level-btn');
        if (btn) {
            const level = parseInt(btn.getAttribute('data-level'));
            selectAILevel(level, btn);
        }
    });
    
    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', function() {
        changeStep(-1);
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
        changeStep(1);
    });
    
    // Download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadDocument();
    });
    
    updateNavigationButtons();
});

function selectProgramme(programme, button) {
    console.log('Programme selected:', programme);
    selectedProgramme = programme;
    
    // Remove selected class from all buttons
    document.querySelectorAll('.programme-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Populate subjects and grades dropdowns
    populateSubjects(programme);
    populateGrades(programme);
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function populateSubjects(programme) {
    const subjectSelect = document.getElementById('subject');
    subjectSelect.innerHTML = '<option value="">Select a subject...</option>';
    
    if (subjects[programme]) {
        subjects[programme].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }
}

function populateGrades(programme) {
    const gradeSelect = document.getElementById('grade');
    gradeSelect.innerHTML = '<option value="">Select grade...</option>';
    
    if (grades[programme]) {
        grades[programme].forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
        });
    }
}

function selectAILevel(level, button) {
    console.log('AI Level selected:', level);
    selectedAILevel = level;
    
    // Remove selected class from all AI level buttons
    document.querySelectorAll('.ai-level-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
}

function changeStep(direction) {
    const steps = document.querySelectorAll('.step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Hide current step
    steps[currentStep - 1].classList.remove('active');
    progressSteps[currentStep - 1].classList.remove('active');
    if (direction > 0) {
        progressSteps[currentStep - 1].classList.add('completed');
    }
    
    // Update step number
    currentStep += direction;
    
    // Show new step
    steps[currentStep - 1].classList.add('active');
    progressSteps[currentStep - 1].classList.add('active');
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Populate criteria if moving to step 4
    if (currentStep === 4) {
        populateCriteria();
    }
    
    // Generate success criteria if moving to step 5
    if (currentStep === 5) {
        generateSuccessCriteria();
    }
    
    // Generate preview if moving to step 8
    if (currentStep === 8) {
        generatePreview();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Show/hide previous button
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    // Update next button text and visibility
    if (currentStep === 8) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-block';
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }
}

function populateCriteria() {
    const criteriaList = document.getElementById('criteriaList');
    criteriaList.innerHTML = '';
    
    const subject = document.getElementById('subject').value;
    const criteria = mypCriteria[subject] || [
        { name: 'Criterion A', description: 'Knowledge and understanding', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion B', description: 'Application', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion C', description: 'Communication', strands: ['i', 'ii', 'iii'] },
        { name: 'Criterion D', description: 'Thinking', strands: ['i', 'ii', 'iii'] }
    ];
    
    criteria.forEach((criterion, index) => {
        const container = document.createElement('div');
        container.className = 'criterion-container';
        
        const header = document.createElement('div');
        header.className = 'criterion-header';
        header.innerHTML = `
            <input type="checkbox" id="criterion${index}" value="${criterion.name}" checked>
            <label for="criterion${index}">${criterion.name}: ${criterion.description}</label>
        `;
        
        const strandsDiv = document.createElement('div');
        strandsDiv.className = 'strand-selection';
        strandsDiv.id = `strands${index}`;
        
        criterion.strands.forEach(strand => {
            const strandLabel = document.createElement('label');
            strandLabel.className = 'strand-checkbox';
            strandLabel.innerHTML = `
                <input type="checkbox" name="strand_${criterion.name}" value="${strand}" checked>
                Strand ${strand}
            `;
            strandsDiv.appendChild(strandLabel);
        });
        
        // Add event listener to criterion checkbox
        const criterionCheckbox = header.querySelector('input[type="checkbox"]');
        criterionCheckbox.addEventListener('change', function() {
            toggleStrands(index);
        });
        
        container.appendChild(header);
        container.appendChild(strandsDiv);
        criteriaList.appendChild(container);
    });
}

function toggleStrands(index) {
    const checkbox = document.getElementById(`criterion${index}`);
    const strandsDiv = document.getElementById(`strands${index}`);
    const strandCheckboxes = strandsDiv.querySelectorAll('input[type="checkbox"]');
    
    strandCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        cb.disabled = !checkbox.checked;
    });
}

function generateSuccessCriteria() {
    const container = document.getElementById('successCriteriaContainer');
    container.innerHTML = '';
    
    const criteriaContainers = document.querySelectorAll('.criterion-container');
    
    criteriaContainers.forEach(criterionContainer => {
        const checkbox = criterionContainer.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const criterionName = checkbox.value;
            const selectedStrands = [];
            
            const strandCheckboxes = criterionContainer.querySelectorAll('input[name^="strand_"]:checked');
            strandCheckboxes.forEach(cb => {
                selectedStrands.push(cb.value);
            });
            
            if (selectedStrands.length > 0) {
                const group = document.createElement('div');
                group.className = 'form-group';
                group.innerHTML = `
                    <label>${criterionName} (Strands: ${selectedStrands.join(', ')}) - Success Criteria</label>
                    <textarea placeholder="Describe what students need to demonstrate for ${criterionName}..." rows="4"></textarea>
                `;
                container.appendChild(group);
            }
        }
    });
}

function generatePreview() {
    const summary = document.getElementById('documentSummary');
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const teacher = document.getElementById('teacher').value;
    const unitTitle = document.getElementById('unitTitle').value;
    const dueDate = document.getElementById('dueDate').value;
    
    // Get selected criteria and strands
    const selectedCriteria = [];
    const criteriaContainers = document.querySelectorAll('.criterion-container');
    criteriaContainers.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const criterionName = checkbox.value;
            const strands = [];
            container.querySelectorAll('input[name^="strand_"]:checked').forEach(cb => {
                strands.push(cb.value);
            });
            if (strands.length > 0) {
                selectedCriteria.push(`${criterionName} (${strands.join(', ')})`);
            }
        }
    });

    // Get selected ATL skills
    const atlSkills = [];
    document.querySelectorAll('#atlSkills input[type="checkbox"]:checked').forEach(cb => {
        atlSkills.push(cb.value);
    });
    
    summary.innerHTML = `
        <p><strong>Programme:</strong> ${selectedProgramme}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Unit:</strong> ${unitTitle}</p>
        <p><strong>Teacher:</strong> ${teacher}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p><strong>Criteria & Strands:</strong> ${selectedCriteria.join(', ')}</p>
        <p><strong>ATL Skills:</strong> ${atlSkills.length > 0 ? atlSkills.join(', ') : 'None selected'}</p>
        <p><strong>AI Level:</strong> ${selectedAILevel !== null ? selectedAILevel : 'Not specified'}</p>
    `;
}

function downloadDocument() {
    try {
        // Collect all form data
        const data = {
            programme: selectedProgramme,
            subject: document.getElementById('subject').value,
            grade: document.getElementById('grade').value,
            dueDate: document.getElementById('dueDate').value,
            homeroom: document.getElementById('homeroom').value,
            unitTitle: document.getElementById('unitTitle').value,
            teacher: document.getElementById('teacher').value,
            assessmentForm: document.getElementById('assessmentForm').value,
            taskDescription: document.getElementById('taskDescription').value,
            statementOfInquiry: document.getElementById('statementOfInquiry').value,
            keyConcepts: document.getElementById('keyConcepts').value,
            globalContext: document.getElementById('globalContext').value,
            customRubric: document.getElementById('customRubric').value,
            aiLevel: selectedAILevel
        };

        // Get selected criteria and strands
        const selectedCriteria = [];
        const criteriaContainers = document.querySelectorAll('.criterion-container');
        criteriaContainers.forEach(container => {
            const checkbox = container.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const criterionName = checkbox.value;
                const criterionDesc = checkbox.nextElementSibling.textContent.split(': ')[1];
                const strands = [];
                container.querySelectorAll('input[name^="strand_"]:checked').forEach(cb => {
                    strands.push(cb.value);
                });
                if (strands.length > 0) {
                    selectedCriteria.push({
                        name: criterionName,
                        description: criterionDesc,
                        strands: strands
                    });
                }
            }
        });

        // Get ATL skills
        const atlSkills = [];
        document.querySelectorAll('#atlSkills input[type="checkbox"]:checked').forEach(cb => {
            atlSkills.push(cb.value);
        });

        // Get success criteria
        const successCriteria = [];
        document.querySelectorAll('#successCriteriaContainer textarea').forEach((textarea, index) => {
            if (textarea.value.trim()) {
                const label = textarea.previousElementSibling;
                successCriteria.push({
                    criterion: label ? label.textContent : `Criterion ${index + 1}`,
                    description: textarea.value
                });
            }
        });

        // Format date
        const formattedDate = new Date(data.dueDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Get AI level information
        const aiInfo = data.aiLevel !== null ? aiLevelInfo[data.aiLevel] : null;

        // Create HTML content matching GESS template
        let htmlContent = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset="utf-8">
                <title>GESS ${data.programme} Assessment Task</title>
                <style>
                    body { 
                        font-family: Calibri, Arial, sans-serif; 
                        font-size: 11pt;
                        margin: 40px;
                        line-height: 1.3;
                    }
                    h1 { 
                        color: #00A651; 
                        font-size: 16pt;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    h2 { 
                        color: #00A651; 
                        font-size: 14pt;
                        font-weight: bold;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin: 15px 0;
                        font-size: 10pt;
                    }
                    th, td { 
                        border: 1px solid #000; 
                        padding: 8px;
                        text-align: left;
                        vertical-align: top;
                    }
                    th { 
                        background-color: #00A651; 
                        color: white;
                        font-weight: bold;
                    }
                    .info-table td:first-child {
                        font-weight: bold;
                        width: 25%;
                        background-color: #E8F5E9;
                    }
                    .rubric-table th {
                        width: 20%;
                    }
                    .ai-box {
                        border: 2px solid #00A651;
                        padding: 15px;
                        margin: 20px 0;
                        background-color: #E8F5E9;
                    }
                    .ai-box h3 {
                        color: #00A651;
                        margin-top: 0;
                    }
                    p {
                        margin: 8px 0;
                    }
                </style>
            </head>
            <body>
                <h1>GESS ${data.programme} Assessment Task Clarifications</h1>
                
                <p>Summative assessment tasks are directly linked to the unit statement of inquiry and provide an opportunity for you to demonstrate your knowledge, understanding and skills based on your learning during the unit.</p>
                
                <table class="info-table">
                    <tr>
                        <td>Student name</td>
                        <td></td>
                        <td>Homeroom</td>
                        <td>${data.homeroom}</td>
                    </tr>
                    <tr>
                        <td>Subject</td>
                        <td>${data.subject}</td>
                        <td>Due Date</td>
                        <td>${formattedDate}</td>
                    </tr>
                    <tr>
                        <td>Unit Title</td>
                        <td>${data.unitTitle}</td>
                        <td>Criteria and ATLS Being Assessed</td>
                        <td>${selectedCriteria.map(c => c.name.replace('Criterion ', '')).join('')} ${atlSkills.length > 0 ? atlSkills.join(', ') : ''}</td>
                    </tr>
                    <tr>
                        <td>Key and related concepts</td>
                        <td>${data.keyConcepts}</td>
                        <td>Global Context</td>
                        <td>${data.globalContext}</td>
                    </tr>
                    <tr>
                        <td>Statement of Inquiry</td>
                        <td colspan="3">${data.statementOfInquiry}</td>
                    </tr>
                    <tr>
                        <td>Subject Objectives and ATLS being assessed:</td>
                        <td colspan="3">
                            ${selectedCriteria.map(c => {
                                return `<strong>${c.name}</strong> ${c.description}<br>Strands: ${c.strands.join(', ')}<br><br>`;
                            }).join('')}
                        </td>
                    </tr>
                    <tr>
                        <td>Form of Assessment (the method by which the assessment will be made)</td>
                        <td colspan="3">${data.assessmentForm}<br><br>${data.taskDescription}</td>
                    </tr>
                    <tr>
                        <td>Task specific clarifications use your Success Criteria and define your Command Terms:</td>
                        <td colspan="3">
                            ${successCriteria.map(sc => `<strong>${sc.criterion}</strong><br>${sc.description}<br><br>`).join('')}
                        </td>
                    </tr>
                </table>
                
                ${aiInfo ? `
                    <div class="ai-box">
                        <h3>${aiInfo.icon} ${aiInfo.level}</h3>
                        <p><strong>Description:</strong> ${aiInfo.description}</p>
                        <p><strong>Examples:</strong></p>
                        <p style="white-space: pre-line;">${aiInfo.examples}</p>
                        <p><strong>Disclosure Requirements:</strong> ${aiInfo.disclosure}</p>
                    </div>
                ` : ''}
                
                <table class="info-table">
                    <tr>
                        <th>Student signature</th>
                        <th colspan="2">I have read and understood what is required of me in this task. I confirm that the work I have submitted is my own original work. I understand that failure to cite sources appropriately or to submit work that is not my own constitutes a breach of the school's academic integrity policy and the IB's expectations for ethical conduct. ______________________________________________</th>
                        <th>Date</th>
                    </tr>
                </table>
                
                ${selectedCriteria.map(criterion => {
                    const descriptors = criterionDescriptors[criterion.name];
                    if (!descriptors) return '';
                    
                    return `
                        <h2>${criterion.name}: ${criterion.description}</h2>
                        <table class="rubric-table">
                            <tr>
                                <th>Achievement level</th>
                                <th>Level descriptor</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>${descriptors['0']}</td>
                            </tr>
                            <tr>
                                <td>1–2</td>
                                <td>${descriptors['1-2']}</td>
                            </tr>
                            <tr>
                                <td>3–4</td>
                                <td>${descriptors['3-4']}</td>
                            </tr>
                            <tr>
                                <td>5–6</td>
                                <td>${descriptors['5-6']}</td>
                            </tr>
                            <tr>
                                <td>7–8</td>
                                <td>${descriptors['7-8']}</td>
                            </tr>
                        </table>
                    `;
                }).join('')}
                
                ${data.customRubric ? `
                    <h2>Custom Rubric</h2>
                    <p>${data.customRubric.replace(/\n/g, '<br>')}</p>
                ` : ''}
            </body>
            </html>
        `;

        // Create a Blob from the HTML content
        const blob = new Blob(['\ufeff', htmlContent], {
            type: 'application/msword'
        });

        // Create filename
        const fileName = `GESS_${data.programme}_Assessment_${data.subject.replace(/\s+/g, '_')}_${data.grade}.doc`;

        // Use FileSaver to download
        saveAs(blob, fileName);
        
        alert('Document downloaded successfully!');
    } catch (error) {
        console.error('Error generating document:', error);
        alert('There was an error generating the document: ' + error.message);
    }
}
