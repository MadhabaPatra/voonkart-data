import React from 'react';
import Footer from './Footer';
import Menu from "./Menu"

const noContent=()=>(
    <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Sorry,this content is not available right now.</span>
              </div>
            </div>
    </div>
    </div>
    </section>
)
const Base=({
    title="My Title",
    description="My Description",
    children
    })=>(
    <div>
   <Menu />
   <main>
    {children?children:noContent()}
    </main>
    <Footer />
    </div>
)
export default Base;