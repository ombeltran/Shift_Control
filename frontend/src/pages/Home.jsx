import React from 'react';
import { Botton } from "../components/Botton";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Card>
                <Link to="/employees">
                    <Botton>
                        Employees
                    </Botton>
                </Link>
                <Link to="/customers">
                    <Botton>
                    Customers
                    </Botton>
                </Link>
            </Card>
        </div>
    )
}

export default Home