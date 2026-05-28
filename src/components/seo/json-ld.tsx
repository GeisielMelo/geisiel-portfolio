import { FC } from 'react'

interface JsonLdProps {
  data: object | object[]
  id?: string
}

export const JsonLd: FC<JsonLdProps> = ({ data, id }) => {
  return (
    <script
      type='application/ld+json'
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
