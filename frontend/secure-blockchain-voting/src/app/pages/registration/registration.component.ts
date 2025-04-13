import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  imports: [ CommonModule, RouterModule, FormsModule ],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  elections = [
    { id: 1, title: '2025 Student Union Election' },
    { id: 2, title: 'Engineering Dept Rep Election' },
    { id: 3, title: 'Faculty Senate Election' },
  ];
  
  selectedElectionId: number | null = null;
  walletAddress: string | null = null;
  isRegistering = false;
  showSuccessModal = false;
  
  connectWallet() {
    if ((window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
        this.walletAddress = accounts[0];
      }).catch((err: any) => console.error('Wallet connection error:', err));
    } else {
      alert('MetaMask not detected. Please install it.');
    }
  }
  
  registerForElection() {
    this.isRegistering = true;
  
    // Simulated contract interaction — replace this with actual smart contract call
    setTimeout(() => {
      this.isRegistering = false;
      this.showSuccessModal = true;
    }, 1500);
  }
  
  closeModal() {
    this.showSuccessModal = false;
  }
  
  getElectionTitle(id: number | null): string {
    const match = this.elections.find(e => e.id === id);
    return match ? match.title : '';
  }
  
}
