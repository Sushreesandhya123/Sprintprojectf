import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineTrendingUp,
	HiOutlineChartSquareBar,
	HiOutlineBan,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'sprintstatus',
		label: 'Sprint Status',
		path: '/Sprintstatus',
		icon: <HiOutlineCube />
	},
	{
		key: 'blockers',
		label: 'Blockers',
		path: '/Sprintdetails',
		icon: <HiOutlineBan />,
	},
	{
		key: 'velocity',
		label: 'Velocity',
		path: '/Team',
		icon: <HiOutlineTrendingUp />,
	},
	{
		key: 'productionpipeline',
		label: 'Pipelines',
		// path: '/Sprint',
		icon: <HiOutlineChartSquareBar />
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