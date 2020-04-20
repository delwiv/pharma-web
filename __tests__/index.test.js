import React from 'react'
import { render } from '@testing-library/react'
import Index from '../src/pages/index'

test('renders deploy link', () => {
  const { getByText } = render(<Index />)
  const linkElement = getByText(
    /Instantly deploy your Next\.js site to a public URL with ZEIT Now\./
  )
  expect(linkElement).toBeInTheDocument()
})
