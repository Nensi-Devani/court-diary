import React from 'react'
import { Link } from 'react-router-dom'

const Title = ({title, breadCrumpParent, breadCrumpParentLink }) => {
  return (
    <div className='content-header'>
      <div className='container-fluid'>
        <div className='row mb-2'>
            
          <div className='col-sm-6'>
            <h1>{title}</h1>
          </div>

          {breadCrumpParent && (
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={breadCrumpParentLink}>{breadCrumpParent}</Link>
                </li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Title
