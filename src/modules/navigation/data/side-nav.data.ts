import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'INTERFACE',
        items: ['OnBoarding', 'OffBoarding'],
    },
    {
        text: 'Reports',
        items: ['OnBoardingReport', 'OffBoardingReport'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },

    OnBoarding: {
        icon: 'book-open',
        text: 'OnBoarding',
        submenu: [
            {
                text: 'Full Time Employee',
                submenu: [
                    {
                        text: 'Credentials',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Introduction To IRM',
                        link: '/dashboard/light',
                    },
                    {
                        text: 'Bank Details',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Welcome Aboard',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'PDN',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Resume',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Onboarded Email',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Declaration',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Welcome To Aaseya',
                        link: '/dashboard/static',
                    },
                ],
            },
            {
                text: 'Contract Employee',
                submenu: [
                    {
                        text: 'Credentials',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Onboarded Details',
                        link: '/dashboard/static',
                    },
                ],
            },
        ],
    },
    OffBoarding: {
        icon: 'columns',
        text: 'OffBoarding',
        submenu: [
            {
                text: 'Last Working Day',
                link: '/dashboard/static',
            },
            {
                text: 'No Dues',
                link: '/dashboard/light',
            },
        ],
    },
    OnBoardingReport: {
        icon: 'chart-area',
        text: 'OnBoarding Report',
        link: '/charts',
    },
    OffBoardingReport: {
        icon: 'table',
        text: 'OffBoarding Report',
        link: '/tables',
    },
};
