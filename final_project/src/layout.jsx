import {Link, Outlet} from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to ="/">Home</Link>
                        <Link to="/room">Rooms</Link>
                    </li>
                    
                </ul>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    )
}