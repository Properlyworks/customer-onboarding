export const FORM_STATE = {
    selectedIndex: 0,
    steps: {
        contactDetails: {
            valid: false,
            dirty: false,
            value: {
                name: '',
                phone: '',
                email: '',
                company: '',
                companyType: '',
                designation: ''
            },
        },
        preferences: {
            valid: false,
            dirty: false,
            value: {
                needConsulting: '',
                preferredMedium: '',
                categories: [] as string[]
            },
        },
        budget: {
            valid: false,
            dirty: false,
            value: {
                budget: ''
            },
        },
        review: {
            valid: true,
            dirty: false,  
        }
    },
};

export const FORM_STEPS = [
  {
    label: `contact-details`,
  },
  {
    label: `preferences`,
  },
  {
    label: `budget`,
    },
  {
    label: `review`,
  },
];

export const YES_NO = ['Yes', 'No'];
export const PREFERRED_MEDIUM = ['Phone', 'Email', 'On-site visit'];
export const CATEGORIES = [
  {
    label: "Automate General Manufacturing (Material Handling)",
    value: "AGM"
  },
  {
    label: "Automate Fabrication Processes (Welding/Grinding/Etc)",
    value: "AFP"
  },
  {
    label: "Automate Inspection Processes (Sorting, Validating)",
    value: "AIP"
  },
  {
    label: "Manufacturing Engineering Support (Fixtures, Jogs, Process Improvement)",
    value: "MES"
  },
  {
    label: "Product Design Support (Enhancement, Performance, Features, Quality)",
    value: "PDS"
  },
  {
    label: "Project Preparation and Planning (Scheduling/Budgeting)",
    value: "PPP"
  },
  {
    label: "Project Scoping",
    value: "PS"
  },
]