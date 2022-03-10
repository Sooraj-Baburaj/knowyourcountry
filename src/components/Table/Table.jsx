import './table.css';

const Table = ({data}) => {
  return (
    <div className="KYC-table">
        {data.length === 0 ? 
        (
            <div className="noData">
                <p>No data to display... Fill the form and submit to see details about a region.</p>
            </div>
        ) 
        : 
        (<table>
            <thead>
                <tr>
                <td><strong>Countries</strong></td>
                <td><strong>Official name</strong></td>
                <td><strong>Flag</strong></td>
                <td><strong>Population</strong></td>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.name.common}</td>
                        <td>{d.name.official}</td>
                        <td>{d.flag}</td>
                        <td>{d.population}</td>
                    </tr>
                ))}
            </tbody>
        </table>)}
    </div>
  )
}

export default Table