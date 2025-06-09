function Header() {
  
   function handleReset() {
    const confirmReset = window.confirm("Want to reset all chat data and return to the home page?");
    if (confirmReset) {
      window.location.reload(); // รีเฟรชหน้าเว็บ
    }
  }

  return (
    <header>
        <h1>DocInsight</h1>
        <p>Learn from PDF documents and images</p>
        <hr/>
         <button className="top-right-button" onClick={handleReset}>Reset</button>
    </header>
  )
}

export default Header
