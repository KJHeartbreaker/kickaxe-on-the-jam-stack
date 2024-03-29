import React from 'react'
import cx from 'classnames'
import classNames from 'classnames/bind'

import Freeform from '@blocks/freeform'
import Accordions from '@blocks/accordions'
import ContactForm from '@components/contactForm'

const Grid = ({ data = {} }) => {
  const { size, columns } = data

  const getGridSize = (
    breakpoint,
    size,
    justify = false,
    align = false,
    start = false
  ) => {
    const hasBreakpoint = breakpoint && breakpoint.trim()
    const colSpan = hasBreakpoint
      ? `${breakpoint}:col-span-${size}`
      : `col-span-${size}`

    const colStart = hasBreakpoint
      ? `${breakpoint}:col-start-${start}`
      : `col-start-${start}`

    const colJustify = hasBreakpoint ? `${breakpoint}:${justify}` : justify
    const colAlign = hasBreakpoint ? `${breakpoint}:${align}` : align

    return cx(
      colSpan,
      start && colStart,
      justify && colJustify,
      align && colAlign,
      colSpan === 'col-span-3' ? 'w-full' : ''
    )
  }

  return (
    <section className="section">
      <div className="section--content">
        <div
          className={`grid grid-cols-${size} gap-x-4 gap-y-4 sm:gap-x-8 lg:gap-x-12 lg:gap-y-6`}
        >
          {columns.map((col, key) => {
            const { sizes, blocks } = col

            return (
              <div
                key={key}
                className={cx(
                  sizes.map((size) =>
                    getGridSize(
                      size.breakpoint,
                      size.width,
                      size.justify,
                      size.align,
                      size.start
                    )
                  )
                )}
              >
                {blocks.map((block, key) => (
                  <GridBlock key={key} block={block} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const GridBlock = ({ block }) => {
  const type = block._type

  switch (type) {
		case 'freeform':
			return <Freeform data={block} />
		case 'contactForm':
			return <ContactForm data={block} />
		case 'accordions':
			return <Accordions data={block} />
		default:
			return null
  }
}

export default Grid
