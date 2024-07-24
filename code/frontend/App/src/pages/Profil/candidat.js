import React, { useEffect } from 'react';

import {
    ContainerCandidat,
    InputContainerC,
    InputContainerCandidat,
    InputSubContainerCandidat,
    EditProfilCandidat
} from '../../styles/Profil/Profil.candidat.style';

const ProfilCandidat = () => {

    return (
        <ContainerCandidat>
            <EditProfilCandidat>
                <button>Edit info</button>
            </EditProfilCandidat>
            <InputContainerC>
                <InputContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Email</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Code Postal</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Ville</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Pays</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                </InputContainerCandidat>
                <InputContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Genre</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Date de naissance</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                    <InputSubContainerCandidat>
                        <p>Numero de telephone</p>
                        <input type="text"  />
                    </InputSubContainerCandidat>
                </InputContainerCandidat>
            </InputContainerC>
        </ContainerCandidat>
    );
}

export default ProfilCandidat;