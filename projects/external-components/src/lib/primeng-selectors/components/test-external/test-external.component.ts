import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

@Component({
  selector: 'app-test',
  template: `
    <!-- 
      Image Gallery with Next/Back in Modal
      - Responsive grid of images.
      - Click to open modal overlay.
      - Next and Back buttons for navigating images in modal.
      - Hardcoded image list.
    -->
    <div class="gallery">
      <div 
        class="thumb" 
        *ngFor="let img of images; let i = index"
        (click)="openModal(i)"
        tabindex="0"
        aria-label="View image"
      >
        <img [src]="img" alt="Gallery image {{i + 1}}">
      </div>
    </div>
    <div class="modal" *ngIf="modalOpen" (click)="closeModal()" tabindex="0">
      <button class="nav-btn left" (click)="prevImage($event)" [disabled]="selectedIndex === 0" aria-label="Previous">&#8592;</button>
      <img [src]="images[selectedIndex]" class="modal-img" alt="Large view">
      <button class="nav-btn right" (click)="nextImage($event)" [disabled]="selectedIndex === images.length - 1" aria-label="Next">&#8594;</button>
      <button class="close-btn" (click)="closeModal(); $event.stopPropagation()" aria-label="Close">&times;</button>
    </div>
  `,
  styles: [`
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 16px;
    }
    .thumb {
      width: 150px;
      height: 100px;
      overflow: hidden;
      cursor: pointer;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.2s;
    }
    .thumb:hover, .thumb:focus {
      transform: scale(1.05);
      outline: 2px solid #1976d2;
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.2s;
    }
    .modal-img {
      max-width: 80vw;
      max-height: 80vh;
      border-radius: 8px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.25);
      background: #fff;
    }
    .close-btn {
      position: absolute;
      top: 24px;
      right: 36px;
      font-size: 2rem;
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 10001;
    }
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(30,30,30,0.7);
      color: #fff;
      border: none;
      font-size: 2rem;
      padding: 0.5rem 1rem;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10000;
      user-select: none;
      transition: background 0.2s;
    }
    .nav-btn.left { left: 40px; }
    .nav-btn.right { right: 40px; }
    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `]
})
export class TestComponent extends CommonExternalComponent {
  // Hardcoded demo images
  images: string[] = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80'
  ];
  modalOpen: boolean = false;
  selectedIndex: number = 0;

  openModal(index: number): void {
    this.selectedIndex = index;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    }
  }
}