import React from "react";
import roboFace from "../../public/judgeBot.png"; 

export default function Footer(){
    
    return(
        <footer className="footer items-center p-4 bg-neutral text-neutral-content z-20 h-fit lg:h-[241px] xl:h-fit">
          <div className="items-center flex flex-col w-full justify-around gap-y-5 md:gap-0 md:flex-row">
            <a className="w-[120px] flex justify-center px-3" href="#" aria-label="Navigate to homepage">
              <img
                className="object-fit w-[120px]"
                src={roboFace.src}
                alt="Judge Bot Logo"
                title="Magic Judge Bot"
              />
            </a>

            <div id="footer-disclaimer" className="flex flex-col justify-center px-3 md:w-[30%]">
              <h4 className="hidden md:block text-base font-medium">
                Disclaimer:
              </h4>
              <p>This tool is free and not for profit.</p>
              <p className="hidden md:block">
                Designed to be used for free by the community of Magic players.
              </p>
              <p className="hidden md:block">
                This tool and its author are in no way affiliated with Wizards of the Coast and claims no ownership over Magic the Gathering or any of its art or characters.
              </p>
            </div>

            <div id="footer-credits" className=" flex flex-col justify-center px-3 md:w-[30%]">
            <h4 className="hidden md:block text-base font-medium">
                Credits:
              </h4>
              <p>Developed by @manski117.</p>
              <p className="hidden md:block">
                Data courtesy of <a href="https://mtgjson.com/">MTGJSON</a> and <a href="https://magic.wizards.com/en/rules">MTG Comprehensive Rules</a>.
              </p>
              <p className="hidden md:block">
                Images courtesy of{" "}
                <a href="https://scryfall.com/docs/api" target="_blank">
                  Scryfall.
                </a>{" "}
              </p>
            </div>

            <div id="social-icons" className="flex flex-row w-fit gap-3 h-fit flex justify-center px-3">
            <a href="https://github.com/manski117/">
              <img
                src="https://img.icons8.com/ios-filled/50/c2cbf5/github.png"
                className="w-6 h-6"
                alt="link to author's github"
                title="link to author's github"
              />
            </a>
            <a href="https://github.com/manski117">
              <img
                src="https://img.icons8.com/ios-filled/50/c2cbf5/portfolio.png"
                className="w-6 h-6"
                alt="link to author's portfolio website"
                title="link to author's portfolio website"
              />
            </a>
            <a href="#">
              <img
                src="https://img.icons8.com/material-rounded/24/c2cbf5/home.png"
                className="w-6 h-6"
                alt="link to homepage"
                aria-label="Navigate to homepage"
              />
            </a>
            
          </div>
          </div>
        </footer>

    )
}