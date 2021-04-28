var holoStream = 0;

function onClickQualityButton(clickedButton, profile)
{
    holoStream.setQualityProfile(profile);

    let profileContainer = document.getElementById("ProfileContainer");
    var buttons = profileContainer.getElementsByTagName('button');
    for (let i = buttons.length - 1; i >= 0; i--)
    {
        buttons[i].className = "ProfileButton";

        if (buttons[i] === clickedButton)
        {
            buttons[i].className += ' SelectedProfileButton';
        }

        if (holoStream.getActiveProfile() === buttons[i].profile)
        {
            buttons[i].className += ' AutoSelectedProfileButton';
        }
    }
}

function populateProfileButtons(profiles)
{
    let profileContainer = document.getElementById("ProfileContainer");

    var buttons = profileContainer.getElementsByTagName('button');
    for (let i = buttons.length - 1; i >= 0; i--){
        if (buttons[i].id.includes("AdaptiveButton")){

            if (holoStream.requestWorker.adaptiveStreaming){
                buttons[i].className += ' SelectedProfileButton';
            }

            buttons[i].onclick = () => {
                onClickQualityButton(buttons[i], undefined);
            }

            continue;
        }

        buttons[i].remove();
    }

    let requestWorker = this;
    profiles.forEach(profile => {
        if (profile.displayName){
            let profileName = profile.displayName;

            var profileContainerElement = document.createElement('button');
            profileContainerElement.id = 'ProfileButton';
            profileContainerElement.className = 'ProfileButton';
            profileContainerElement.innerHTML = profileName;
            profileContainerElement.profile = profile;
            profileContainerElement.onclick = () => { onClickQualityButton(profileContainerElement, profile); }
            profileContainer.appendChild(profileContainerElement);

            let className = "ProfileButton"
            if (holoStream.getActiveProfile() === profile)
            {
                this.overallProfile = profile.id;
                className += ' AutoSelectedProfileButton';

                if (!holoStream.requestWorker.adaptiveStreaming){
                    className += ' SelectedProfileButton';
                }
            }
            profileContainerElement.className = className;
        }
    });
};

function onURLOpened()
{
    populateProfileButtons(holoStream.getQualityProfiles());
}

function onQualityChanged(profile)
{
    let profileName = profile.displayName;
    let profileContainer = document.getElementById("ProfileContainer");
    var buttons = profileContainer.getElementsByTagName('button');
    for (let i = buttons.length - 1; i >= 0; i--)
    {
        if (buttons[i].id.includes("AdaptiveButton"))
        {
            continue;
        }

        buttons[i].className = buttons[i].className.replace(" AutoSelectedProfileButton", "");

        if (buttons[i].innerHTML === profileName)
        {
            buttons[i].className += " AutoSelectedProfileButton";
        }
    }
}
