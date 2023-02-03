import React from "react";
import Console from "../../components/console/Console";
import useConsoles from '../../hooks/useConsoles'
import { motion } from "framer-motion";
import "./ConsolesPage.scss";
function ConsolesPage() {
  const { consoles } = useConsoles()
  
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, type: "tween" }}
    className="consolepage">
      <div>
        <h1>Consolas mas populares</h1>
      </div>
      <div className="consolesList">
        {consoles
          ? consoles.map((console, index) => <Console index={index} console={console} />)
          : ""}
      </div>
    </motion.div>
  );
}

export default ConsolesPage;
