import {useContext, useEffect, useState} from 'react'
import {UserContext} from "../context/user/userContext"
import { useNavigate } from 'react-router-dom'
import Admin_customer from '../components/admin/Admin_customers'
import Admin_products from '../components/admin/Admin_products'
import Admin_reservations from '../components/admin/Admin_reservations'
import Admin_sales from '../components/admin/Admin_sales'
const Dashboard_admin = () => {
    const [user, ] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        try{
            if (user === null) {
                navigate('/login')
              }else{
                if (user.typeUser === "client") {
                    navigate('/dashboard-client')
                  }
              }
        }catch{
            navigate('/login')
        }
      }, [user, navigate]);

      const [activeTab, setActiveTab] = useState('tab1');
      const handleTabSelect = (tabKey) => {
        setActiveTab(tabKey);
      };
    
      const tabItems = [
        { id: 'tab1', title: 'Reservas', content: <Admin_reservations /> },
        { id: 'tab2', title: 'Clientes', content: "" /*<Admin_customer />*/ },
        { id: 'tab3', title: 'Ventas', content: <Admin_sales /> },
        { id: 'tab4', title: 'Productos', content: <Admin_products /> },
      ];
      console.log(user)
      console.log(user!==null)
      console.log(user.user.name)
    return(
        <section className='container'>
          {(user) ? (
            <div>
                <h1>{user.user.name} {user.user.lastName}</h1>
                <div className="container mt-4">
      <ul className="nav nav-tabs">
        {tabItems.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? 'active' : 'bg-celeste'}`}
              onClick={() => handleTabSelect(tab.id)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabItems.map((tab) => (
          <div
            className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
            key={tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
            </div>
            ) : (<div><p>Usuario no disponible</p></div>)}

        </section>
    )
}

export default Dashboard_admin