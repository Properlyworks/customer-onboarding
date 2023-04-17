export const FORM_STATE = {
    selectedIndex: 0,
    steps: {
        details: {
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
                categories: []
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
    label: `Contact Details`,
  },
  {
    label: `What are you looking for`,
  },
  {
    label: `Budget`,
    },
  {
    label: `Review`,
  },
];