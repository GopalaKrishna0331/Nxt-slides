import './index.css'

const NxtSlides = props => {
  const {each, index, onSelectItem, selectId} = props
  const {id, heading, description} = each
  const bgColor = id === selectId ? 'slide-item' : null
  const transparent = id === selectId ? 'transparent' : null

  const onClickItem = () => {
    onSelectItem(id)
  }
  return (
    <li
      className={`list-container ${bgColor}`}
      onClick={onClickItem}
      testid={`slideTab${index + 1}`}
    >
      <p className="count">{index + 1}</p>
      <div className={`slides-element-container ${transparent}`}>
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </div>
    </li>
  )
}

export default NxtSlides
