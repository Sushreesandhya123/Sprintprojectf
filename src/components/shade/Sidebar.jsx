import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.webp';
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants/Navigation';

const linkClass = 
	'flex items-center gap-2 px-4 py-3 hover:bg-blue-600 hover:no-underline active:bg-blue-500 rounded-sm text-lg' 
export default function Sidebar() {
	return (
		<div className="bg-blue-700 w-64 p-4 flex flex-col"> 
			<div className="flex items-center gap-2 px-1 py-3">
            <img src={logo} alt="Logo" className="h-15 w-auto" />
            </div>
			<div className="py-8 flex flex-1 flex-col gap-1">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-1 pt-3 border-t border-blue-500">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div className={classNames(linkClass, 'cursor-pointer text-white font-semibold')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(
				pathname === link.path ? 'bg-blue-600 text-white font-semibold' : 'text-blue-200 font-semibold', // Ensure font weight and color are applied correctly
				linkClass
			)}
		>
			<span className="text-2xl">{link.icon}</span> 
			{link.label}
		</Link>
	)
}
