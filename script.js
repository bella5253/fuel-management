// Data
const vehicles = [
    'KBH 952V', 'KBM 190H', 'KBP 540Q', 'KCK 951W', 'KCN 684B', 
    'KCQ 103H', 'KCQ 251B', 'KCQ 257Q', 'KCR 853N', 'KCU 452S',
    'KCU 967G', 'KCV 952J', 'KCW 914H', 'KCW 952C', 'KCW 953C',
    'KCZ 652S', 'KDC 153R', 'KDD 553V', 'KDH 113Y', 'KDJ 027M',
    'KDJ 028M', 'KDJ 184S', 'KDL 153W', 'KDM 452W', 'KDM 752Y',
    'KDP 314F', 'KHMA 353L', 'KHMA 355L', 'KMEA 911T', 'KTCB 472V',
    'KTCB 473V', 'KTCB 474V', 'KTCB 595W', 'ZF 8551', 'ZF 9776',
    'UBF 245N', 'UBG 001T (62UN427K)', 'UBF 323N', 'UBF 568P',
    'UBF 324N', 'UBE 247Z'
];

const projects = [
    { code: '51095', name: 'Project 51095' },
    { code: '51105', name: 'Project 51105' },
    { code: '51166', name: 'Project 51166' },
    { code: '51212', name: 'Project 51212' },
    { code: '51268', name: 'Project 51268' },
    { code: '51302', name: 'Project 51302' },
    { code: '51307', name: 'Project 51307' },
    { code: '51336', name: 'Project 51336' },
    { code: '51355', name: 'Project 51355' },
    { code: '51358', name: 'Project 51358' },
    { code: '51365', name: 'Project 51365' },
    { code: '51380', name: 'Project 51380' },
    { code: '51302TAS', name: 'Project 51302TAS' },
    { code: 'HQ', name: 'Headquarters' },
    { code: 'POINT_MALL', name: 'The Point Mall' }
];

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Populate all dropdowns after DOM is loaded
    populateDropdowns();
    
    // Add initial requisition form
    createRequisitionForm();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Set up event listeners
    setupEventListeners();
});

function populateDropdowns() {
    // Populate vehicle dropdowns
    const vehicleSelects = document.querySelectorAll('select[data-type="vehicle"]');
    vehicleSelects.forEach(select => {
        // Clear existing options
        select.innerHTML = '<option value="">Select Vehicle</option>';
        
        // Add vehicle options
        vehicles.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle;
            option.textContent = vehicle;
            select.appendChild(option);
        });
    });

    // Populate project dropdowns
    const projectSelects = document.querySelectorAll('select[data-type="project"]');
    projectSelects.forEach(select => {
        // Clear existing options
        select.innerHTML = '<option value="">Select Project</option>';
        
        // Add project options
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.code;
            option.textContent = `${project.code} - ${project.name}`;
            select.appendChild(option);
        });
    });
}

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            
            // Add active class to clicked tab and its content
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            }
        });
    });
}

let formCount = 0;
const formData = {};

function createRequisitionForm() {
    formCount++;
    const form = document.createElement('div');
    form.className = 'bg-white rounded-lg shadow p-6 mb-4';
    form.innerHTML = `
        <h3 class="text-sm font-bold mb-4">Vehicle ${formCount}</h3>
        <form class="space-y-4" data-form="${formCount}">
            <div>
                <label class="block text-sm font-medium mb-1">Vehicle Number</label>
                <select class="w-full p-2 border rounded" data-type="vehicle" required>
                    <option value="">Select Vehicle</option>
                    ${vehicles.map(v => `<option value="${v}">${v}</option>`).join('')}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Project Code</label>
                <select class="w-full p-2 border rounded" data-type="project" required>
                    <option value="">Select Project</option>
                    ${projects.map(p => `<option value="${p.code}">${p.code} - ${p.name}</option>`).join('')}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Requisition Date</label>
                <input type="date" class="w-full p-2 border rounded" required>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Fuel Amount Required</label>
                <input type="number" class="w-full p-2 border rounded" placeholder="Enter amount" required>
            </div>
        </form>
    `;

    const requisitionForms = document.getElementById('requisition-forms');
    if (requisitionForms) {
        requisitionForms.appendChild(form);
    }

    // Add form change listener
    const newForm = form.querySelector('form');
    if (newForm) {
        newForm.addEventListener('change', handleFormChange);
        
        // Set default date
        const dateInput = newForm.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }
}

function handleFormChange(e) {
    const form = e.currentTarget;
    const formNumber = form.getAttribute('data-form');
    formData[formNumber] = formData[formNumber] || {};
    
    const target = e.target;
    if (target instanceof HTMLSelectElement) {
        if (target.getAttribute('data-type') === 'vehicle') {
            formData[formNumber].vehicle = target.value;
        } else if (target.getAttribute('data-type') === 'project') {
            formData[formNumber].project = target.value;
        }
    } else if (target instanceof HTMLInputElement) {
        if (target.type === 'number') {
            formData[formNumber].amount = parseFloat(target.value) || 0;
        } else if (target.type === 'date') {
            formData[formNumber].date = target.value;
        }
    }
}

function setupEventListeners() {
    // Add vehicle button
    const addVehicleBtn = document.getElementById('add-vehicle');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', createRequisitionForm);
    }

    // Submit all button
    const submitAllBtn = document.getElementById('submit-all');
    if (submitAllBtn) {
        submitAllBtn.addEventListener('click', handleRequisitionSubmit);
    }

    // Fuel filling form
    const fillingForm = document.querySelector('#filling form');
    if (fillingForm) {
        fillingForm.addEventListener('submit', handleFillingSubmit);
    }
}

async function handleRequisitionSubmit() {
    try {
        // Validate all forms
        const forms = document.querySelectorAll('[data-form]');
        let isValid = true;
        
        forms.forEach(form => {
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
        });

        if (!isValid) {
            throw new Error('Please fill in all required fields');
        }

        const total = Object.values(formData).reduce((sum, form) => {
            return sum + (form.amount || 0);
        }, 0);
        
        const totalAmountElement = document.getElementById('total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = total.toLocaleString();
        }
        
        const totalAlert = document.getElementById('total-alert');
        if (totalAlert) {
            totalAlert.classList.remove('hidden');
        }
        
        console.log('Requisition Data:', formData);
        console.log('Total Amount:', total);
        
        alert('Requisition submitted successfully!');
    } catch (error) {
        alert(error.message || 'An error occurred while submitting the requisition');
    }
}

async function handleFillingSubmit(e) {
    e.preventDefault();
    
    try {
        const form = e.currentTarget;
        const formElements = form.elements;
        let isValid = true;
        const fillingData = {};

        // Validate and collect form data
        Array.from(formElements).forEach(element => {
            if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
                if (element.required && !element.value) {
                    isValid = false;
                    element.classList.add('border-red-500');
                } else {
                    element.classList.remove('border-red-500');
                    if (element.type === 'file') {
                        fillingData.receipt = element.files?.[0];
                    } else {
                        fillingData[element.name || element.id || element.getAttribute('data-type')] = element.value;
                    }
                }
            }
        });

        if (!isValid) {
            throw new Error('Please fill in all required fields');
        }

        console.log('Filling Data:', fillingData);
        alert('Fuel filling form submitted successfully!');
        form.reset();
        
    } catch (error) {
        alert(error.message || 'An error occurred while submitting the form');
    }
}
