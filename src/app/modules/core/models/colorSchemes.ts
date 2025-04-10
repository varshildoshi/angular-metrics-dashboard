export interface Color {
    name: string;
    value: string;
    domain: string[];
}

export const colorSets: Color[] = [
    {
        name: 'Vivid',
        value: 'vivid',
        domain: [
            '#647c8a',
            '#3f51b5',
            '#2196f3',
            '#00b862',
            '#afdf0a']
    },
    {
        name: 'Natural',
        value: 'natural',
        domain: [
            '#bf9d76',
            '#e99450',
            '#d89f59',
            '#f2dfa7',
            '#a5d7c6',
        ]
    },
    {
        name: 'Cool',
        value: 'cool',
        domain: [
            '#a8385d',
            '#7aa3e5',
            '#a27ea8',
            '#aae3f5',
            '#adcded',
        ]
    },
    {
        name: 'Fire',
        value: 'fire',
        domain: [
            '#ff3d00',
            '#bf360c',
            '#ff8f00',
            '#ff6f00',
            '#ff5722']
    },
    {
        name: 'Solar',
        value: 'solar',
        domain: [
            '#fff8e1',
            '#ffecb3',
            '#ffe082',
            '#ffd54f',
            '#ffca28',
        ]
    },
    {
        name: 'Air',
        value: 'air',
        domain: [
            '#e1f5fe',
            '#b3e5fc',
            '#81d4fa',
            '#4fc3f7',
            '#29b6f6',
        ]
    },
    {
        name: 'Aqua',
        value: 'aqua',
        domain: [
            '#e0f7fa',
            '#b2ebf2',
            '#80deea',
            '#4dd0e1',
            '#26c6da',
        ]
    },
]