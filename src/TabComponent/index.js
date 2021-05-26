export default function TabItemComponent ({
    icon = '',
    title = '',
    onItemClicked = () => console.error('err'),
    isActive = false,
  }) {
    return (
      <div className={isActive ? 'tabitem' : 'tabitem tabitem--inactive'} onClick={onItemClicked}>
        <i className={icon}></i>
        <p className="tabitem__title">{title}</p>
      </div>
    )
  };