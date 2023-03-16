import React from 'react'

const PageHeader = (props) => {
  return (
    <div>
        <header class="site-header d-flex flex-column justify-content-center align-items-center">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12 text-center">

                        <h2 class="mb-0">{props.title}</h2>
                    </div>

                </div>
            </div>
        </header>
    </div>
  )
}

export default PageHeader;