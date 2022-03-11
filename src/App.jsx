
/**
 * O react é uma biblioteca que usa javascript, html e css;
 * O React é baseado em componentes, então cada pedaço de uma pagina é um componente,
 * Desde button, até o header, como no exemplo
 * Graças ao JSX, é possivel usar html no arquivo javascript
 */
import React, { useState, useEffect } from 'react'; //Biblioteca principal (IMR)
import Tasks from './components/Tasks'; 
import './App.css'; //Css dessa pagina
import AddTask from './components/AddTask';
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';
import {v4 as uuid } from 'uuid'; //Criar ID

import { BrowserRouter as Router, Route } from 'react-router-dom'; //Biblioteca para criar rotas

const App = () => { //Aplicação principal (sfc)
  //A VARIAVEL TASKS É DINAMICA, É O UNICO JEITO DE TER ALGO DINAMICO EM REACT
  const [tasks, setTasks] = useState([ //Cria um state, ou seja, uma variavel e uma função que vai fazer essa variavel mudar de estado, inicialmente, no parametro do useState, coloca-se o valor inicial da variavel
    {
      id: '1',
      title: 'Estudar programação',
      completed: false
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true,
    },
  ]);

  const handleTaskAddition = (taskTitle) => { //Adiciona  tarefas
    if (taskTitle === "") return alert('Digite algo!');
    const newTasks = [ ...tasks, {
      title: taskTitle,
      id: uuid(),
      completed: false,
    }]

    setTasks(newTasks); //Seta o novo estado da variavel tasks
  }

  useEffect(() => {
    console.log("Mudou!")
  }, [tasks]) //TODA VEZ QUE UMA VARIAVEL MUDAR, EXECUTA ESSE BLOCO DE CODIGO

  const handleTaskClick = (taskId) => { //Ao clicar em um tarefa, coloca o atributo completed como true, ou false. Ou seja, se a tarefa está completa ou não
    const newTasks = tasks.map(task => {
      if(task.id === taskId) return {... task, completed: !task.completed};

      return task;
    })

    setTasks(newTasks)
  }

  const handleDeleteClick = (taskId) => { //Deleta uma tarefa
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }
  return ( //Retorna todos os comandos daqui
  //Router para chamar rotas, tudo o que tiver dentro dessa tag, vai ser uma rota
    <Router>
      <div className='container'>
        <Header/>
        <Route path="/"  render={() => { //Cria a rota principal, e renderiza tudo o que tiver la dentro
          return( //Retorna a pagina toda dessa rota
          //O componente AddTask recebe um parametro, no caso, a função de adicionar uma tarefa
          //O Componente Tasks leva como primeiro parametro, as tarefas, no segundo a função de tarefa completa, e por ultimo, a função para deletar uma tarefa
            <>
            <AddTask handleTaskAddition = {handleTaskAddition} /> 
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleDeleteClick={handleDeleteClick}/>
            </>
          )
        }} exact/>
        
        <Route path="/:taskTitle" exact component={TaskDetails}/> 

        </div>
    </Router>
    //O Route la em cima cria uma rota que recebe um parametro (taskTitle), exact pois para acessar a rota tem que ser exatamente do jeito que esta escrito na url
    //e por ultimo, o component, que renderiza o componente nessa rota
  )
}

export default App; //Exporta toda a classe