import React from 'react'

function Introduction_component({title, description}) {
  return (
     <section className="introduction">
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
  )
}

export default Introduction_component