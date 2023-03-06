import React from 'react'

import ThemeSwitch from './theme-switch'

// import Menu from '@blocks/navigation/menu'
// import Newsletter from '@modules/newsletter'
import Icon from '@components/icon'
import Link from 'next/link'

const Footer = ({ data = {} }) => {
  const { blocks } = data

  return (
		<footer className="footer" role="contentinfo">
			<div className="footer--grid">
				<ThemeSwitch />
				<div className="footer--disclaimer">
					<p>Copyright &copy; {new Date().getFullYear()} Kickaxe Guitars.</p>
					<p>All RightsReserved.</p>
				</div>
				{blocks.map((block, key) => (
					<React.Fragment key={key}>
						{block.social ? (
							<div className="footer--block">
								<div className="menu-social">
									{block.social.map((link, i) => {
										return (
											<Link
												key={`social-${i}`}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Icon name={link.icon} />
											</Link>
										)
									})}
								</div>
							</div>
						) : null}
					</React.Fragment>
				))}
			</div>
		</footer>
  )
}

export default Footer
