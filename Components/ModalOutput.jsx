import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const ModalOutput = ({handleDelete,data,editModal}) => {
 
  return (
    <div>
      <div className="container px-0" style={{marginBottom:'85px'}}>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Moved the mapping outside the table row */}
            {data.map((item, index) => {
              return(
                <tr key={index}>
            <td>{item ? item.name : ''}</td>
              <td>{item ? item.email : ''}</td>
              <td>{item ? item.password : ''}</td>
              <td>{item ? item.address : ''}</td>
              <td>{item ? item.city : ''}</td>
              <td>{item ? item.role : ''}</td>
                <td>
                  <EditRoundedIcon  onClick= {() => editModal(index)}
                    className='me-3' />
                  <DeleteRoundedIcon onClick={() => handleDelete(index)} />
                </td>
              </tr>
              )
            }
             
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModalOutput
