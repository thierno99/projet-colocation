import React from 'react';
import { MdOutlineVerified } from 'react-icons/md';
import { BsPiggyBank, BsPeople } from 'react-icons/bs';
const ContributionValue = () => {
    return (
        <div className="my-1 shadow">
            <div className="text-center">
                <div className="flex j-center p-1 wrap">
                    <div className="m-1">
                        <MdOutlineVerified
                            fontSize={90}
                            className='text-success'
                        />
                        <h3>Profils vérifiés</h3>
                        <p>
                            100% des profils sont vérifiés. En cas de <br />
                            suspission de boot vous pouvez toujours le signaler
                        </p>
                    </div>
                    <div className="m-1">
                        <BsPiggyBank
                            fontSize={90}
                            className='text-dark-chocolate'
                        />
                        <h3>Inscription Gratuite</h3>
                        <p>
                            Vous ne payez aucun frais pour votre Inscription <br />
                        </p>
                    </div>
                    <div className="m-1">
                        <BsPeople
                            fontSize={90}
                            className='text-gold'
                        />
                        <h3>Trouver Le coloc qui vous convient</h3>
                        <p>
                            Gerer vos tâches et vos factures <br />
                            directement sur l'application.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContributionValue;