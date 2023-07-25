import './Home.css'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <>
            <div className="home-container">
                <div className="card-container">
                    <h1 className="home-title " style={{

                    }}>Hello Passwords</h1>
                    <h4 className="home-byline">Welcome to a new era of password management</h4>

                    <br />
                    <div className="button-wrapper">
                        <Link to="password">
                            <button className="home-button">Continue</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
} 