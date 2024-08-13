import './Home.css';
import {useNavigate} from 'react-router-dom';
import Avatar from './img/Avatar.jpg'


function Home() {

    let navigate = useNavigate();


    return (
        <div class='home'>
            <nav class="main-nav">
                <a class="name">Andrew Sanchez</a>
                <a href="/mlb">MLB Game Viewer</a>
            </nav>
            <section class="about-me">
                <img class="avatar" src={Avatar}/>
                <h1>Software Developer in Somerville, MA</h1>
                <p>Open to full-time opprotunities</p>
            </section>
        </div>
    )
}

export default Home;
