import React from 'react'

const PageHeader = (props) => {
  return (
    <div>
        <header className="site-header d-flex flex-column justify-content-center align-items-center">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12 col-12 text-center">

                        <h2 className="mb-0">{props.title}</h2>
                    </div>

                </div>
            </div>
        </header>
    </div>
  )
}

export default PageHeader;