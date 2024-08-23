export default function Loading() {
  return <section className='record-app'>
  <div className='gradient-overlay'>
    <div className='main-layout'>
    </div>
  </div>
  <section className='main-layout flex main-container'>
    <div className='left'>
      <img className="skeleton skeleton-loading" alt="" id="cover-img" width={300} height={300} />
    </div>
    <div className='flex col right'>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  </section>
</section>
}