import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import NavBar from './Components/NavBar'

import NxtSlides from './Components/NxtSlides'

import './App.css'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class App extends Component {
  state = {
    selectId: initialSlidesList[0].id,
    headValue: false,
    descriptionValue: false,
    list: initialSlidesList,
    headText: initialSlidesList[0].heading,
    descriptionText: initialSlidesList[0].description,
  }

  onSelectItem = id => {
    const filteredItem = initialSlidesList.filter(each => id === each.id)
    this.setState({
      selectId: id,
      headText: filteredItem[0].heading,
      descriptionText: filteredItem[0].description,
    })
  }

  onClickHead = () => {
    this.setState(prevstate => ({headValue: !prevstate.headValue}))
  }

  onClickDescription = () => {
    this.setState(prevstate => ({
      descriptionValue: !prevstate.descriptionValue,
    }))
  }

  onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      this.setState(prevstate => ({
        headValue: !prevstate.headValue,
        descriptionValue: !prevstate.descriptionValue,
      }))
    }
  }

  onClickInputHead = event => {
    const {selectId} = this.state
    const item = initialSlidesList.map(each => {
      if (each.id === selectId) {
        if (event.target.value === '') {
          return {...each, heading: 'Heading'}
        }
        return {...each, heading: event.target.value}
      }
      return {...each}
    })
    this.setState({
      list: [...item],
      headText: event.target.value,
    })
  }

  onClickInputdescription = event => {
    const {selectId} = this.state
    const item = initialSlidesList.map(each => {
      if (each.id === selectId) {
        if (event.target.value === '') {
          return {...each, description: 'Description'}
        }
        return {...each, description: event.target.value}
      }
      return {...each}
    })
    this.setState({
      list: [...item],
      descriptionText: event.target.value,
    })
  }

  onClickNewButton = () => {
    const {selectId, list} = this.state
    const IndexValue = list.findIndex(each => each.id === selectId)
    const newObject = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }
    this.setState({
      list: [
        ...list.slice(0, IndexValue + 1),
        newObject,
        ...list.slice(IndexValue + 1, list.length),
      ],
      selectId: newObject.id,
      headText: newObject.heading,
      descriptionText: newObject.description,
    })
  }

  onBlurHeadFocus = () => {
    this.setState(prevstate => ({
      headValue: !prevstate.headValue,
    }))
  }

  onBlurDescriptionFocus = () => {
    this.setState(prevstate => ({
      descriptionValue: !prevstate.descriptionValue,
    }))
  }

  render() {
    const {
      selectId,
      headText,
      descriptionText,
      list,
      headValue,
      descriptionValue,
    } = this.state
    const filterItem = list.filter(each => each.id === selectId)
    const {heading, description} = filterItem[0]
    return (
      <>
        <NavBar />
        <button
          className="new-button"
          type="button"
          onClick={this.onClickNewButton}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="plus"
          />
          <span className="span-element">New</span>
        </button>
        <div className="bottom-container">
          <ol className="slides-container">
            {list.map((each, index) => (
              <NxtSlides
                each={each}
                index={index}
                onSelectItem={this.onSelectItem}
                selectId={selectId}
                key={each.id}
              />
            ))}
          </ol>
          <div className="column">
            <div className="edit-container">
              {headValue ? (
                <input
                  className="input"
                  type="text"
                  onChange={this.onClickInputHead}
                  value={headText}
                  onKeyDown={this.onKeyDownEnter}
                  onBlur={this.onBlurHeadFocus}
                />
              ) : (
                <h1 className="head" onClick={this.onClickHead}>
                  {heading}
                </h1>
              )}
              {descriptionValue ? (
                <input
                  className="input-description"
                  type="text"
                  value={descriptionText}
                  onChange={this.onClickInputdescription}
                  onKeyDown={this.onKeyDownEnter}
                  onBlur={this.onBlurDescriptionFocus}
                />
              ) : (
                <p className="description" onClick={this.onClickDescription}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
