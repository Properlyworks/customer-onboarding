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