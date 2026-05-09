import { NavLink } from "react-router-dom"

// Activity s66 Solution
export default function JobCard({ job }) {

  const badgeColor = (status) => {
      switch (status) {
          case 'application submitted':
              return 'badge bg-secondary';
          case 'interview':
              return 'badge bg-primary';
          case 'rejected':
              return 'badge bg-danger';
          case 'accepted':
              return 'badge bg-success';
          default:
              return 'badge bg-secondary';
      }
  }

   return (
       <div className="d-flex justify-content-between align-items-center">
           <div>
               <h4 className="fw-bolder">{ job.title }</h4>
               <h5>{ job.company }</h5>
               <h6 className="text-muted">{ job.location }</h6>
               <span className={badgeColor(job.status)}>{job.status}</span>
               <span className="d-block mt-3">Notes: { job.notes }</span>
           </div>
           <NavLink to={`/editJob/${job._id}`} className="btn btn-sm btn-success">
            Edit
           </NavLink>
       </div>
   )
}