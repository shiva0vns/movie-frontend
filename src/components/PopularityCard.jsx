import '../css/PopularityCard.css'
function PopularityCard({popularity}){
    if(popularity==null)return
    const popularityPercent = Math.floor((popularity / 1000) *100);
    return(<div className="popularity">
    <div className="popularity-header">
      <span>Popularity</span>
      <span>{popularityPercent}/100</span>
    </div>
  
    <div className="progress">
      <div
        className="progress-fill"
        style={{ width: `${popularityPercent}%` }}
      />
    </div>
  </div>)
}

export default PopularityCard