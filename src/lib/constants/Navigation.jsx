import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'sprintstatus',
		label: 'Sprint Status',
		path: '/Sprintdetails',
		icon: <HiOutlineCube />
	},
	{
		key: 'team',
		label: 'Team',
		path: '/Team',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'sprint',
		label: 'Sprint',
		path: '/Sprint',
		icon: <HiOutlineUsers />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		// path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		// path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]