import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService, PersonalInfo, Stat } from '../../services/profile.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { PersonalDetailsService, PersonalDetails } from '../../services/personal-details.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as THREE from 'three';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private animationSpeed = 1;
  private isPaused = false;
  private intersectionObserver?: IntersectionObserver;
  
  personalInfo$: Observable<PersonalInfo | null>;
  stats$: Observable<Stat[]>;
  dataSourceInfo$: Observable<string>;
  translations$: Observable<TranslationData | null>;
  personalDetails$: Observable<PersonalDetails | null>;

  constructor(
    private profileService: ProfileService,
    private languageService: LanguageService,
    private personalDetailsService: PersonalDetailsService
  ) {
    console.log('🔍 About Component: ProfileService injected:', !!this.profileService);
    
    this.personalInfo$ = this.profileService.getPersonalInfo();
    this.stats$ = this.profileService.getStats();
    this.dataSourceInfo$ = this.profileService.data$.pipe(
      map(data => data ? 'Using JSON data' : 'No data loaded')
    );
    this.translations$ = this.languageService.translations$;
    this.personalDetails$ = this.personalDetailsService.personalDetails$;
    
    // Debug: Log data source info
    this.dataSourceInfo$.subscribe(info => {
      console.log('About Component - Data Source:', info);
    });
    
    // Debug: Log personal info
    this.personalInfo$.subscribe(info => {
      if (info) {
        console.log('About Component - Personal Info:', info);
      } else {
        console.log('About Component - No personal info received');
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Add a delay to ensure the DOM is fully rendered and container is available
    setTimeout(() => {
      this.initialize3DScene();
    }, 200);
  }

  ngOnDestroy(): void {
    this.cleanupScene();
  }

  private initialize3DScene(): void {
    try {
      // Check if container exists and is visible
      if (!this.canvasContainer?.nativeElement) {
        console.warn('Canvas container not available');
        return;
      }

      const container = this.canvasContainer.nativeElement;
      const rect = container.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) {
        console.warn('Container has no dimensions, retrying...');
        setTimeout(() => this.initialize3DScene(), 100);
        return;
      }

      // Clean up any existing scene
      this.cleanupScene();
      
      // Initialize new scene
      this.init3DScene();
      
      // Start animation loop
      this.startAnimation();
      
      this.setupEventListeners();
      this.setupIntersectionObserver();
      
      console.log('3D scene initialization completed');
      
    } catch (error) {
      console.error('Error initializing 3D scene:', error);
      this.createFallbackScene();
    }
  }

  private startAnimation(): void {
    console.log('Starting 3D animation loop...');
    this.isPaused = false;
    this.animate();
    
    // Add periodic visibility check
    this.setupVisibilityCheck();
  }

  private setupVisibilityCheck(): void {
    // Check every 5 seconds if the scene is still visible
    setInterval(() => {
      if (this.scene && this.camera && this.renderer && !this.isPaused) {
        // Force a render to maintain visibility
        this.renderer.render(this.scene, this.camera);
      }
    }, 5000);
  }

  private cleanupScene(): void {
    // Stop animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }

    // Remove resize handler
    if ((this as any).resizeHandler) {
      window.removeEventListener('resize', (this as any).resizeHandler);
      (this as any).resizeHandler = null;
    }

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null as any;
    }

    // Clear scene
    if (this.scene) {
      this.scene.clear();
      this.scene = null as any;
    }

    // Clear camera
    this.camera = null as any;

    // Disconnect intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }

    // Clear container
    if (this.canvasContainer?.nativeElement) {
      this.canvasContainer.nativeElement.innerHTML = '';
    }
  }

  // Add method to reinitialize scene when component becomes visible
  public reinitializeScene(): void {
    console.log('Reinitializing 3D scene...');
    this.cleanupScene();
    setTimeout(() => {
      this.initialize3DScene();
    }, 100);
  }

  // Debug method to check scene state
  private debugSceneState(): void {
    console.log('Scene Debug Info:');
    console.log('- Scene exists:', !!this.scene);
    console.log('- Camera exists:', !!this.camera);
    console.log('- Renderer exists:', !!this.renderer);
    console.log('- Animation ID:', this.animationId);
    console.log('- Is Paused:', this.isPaused);
    console.log('- Scene children count:', this.scene?.children.length || 0);
    
    if (this.scene) {
      console.log('- Scene background:', this.scene.background);
      console.log('- Scene children:', this.scene.children.map(child => child.type));
    }
  }

  private isWebGLSupported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
      return false;
    }
  }

  private createFallbackScene(): void {
    console.log('Creating cosmic fallback scene...');
    const container = this.canvasContainer.nativeElement;
    container.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: 
          radial-gradient(circle at 20% 20%, #4a148c 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #1a237e 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, #0d47a1 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        color: white;
        font-size: 2rem;
        text-align: center;
        flex-direction: column;
        gap: 20px;
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #fff, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: twinkle 4s ease-in-out infinite alternate;
        "></div>
        <div style="z-index: 1;">
          <h2>🌌 Cosmic Universe</h2>
          <p>Interactive 3D Experience</p>
          <p style="font-size: 1rem; opacity: 0.8;">WebGL not supported</p>
        </div>
      </div>
      <style>
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      </style>
    `;
  }

  private setupIntersectionObserver(): void {
    if (!this.canvasContainer?.nativeElement) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('About section is visible, ensuring 3D scene is active...');
            this.ensureSceneVisible();
          } else {
            console.log('About section is not visible, pausing 3D scene...');
            this.isPaused = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    this.intersectionObserver.observe(this.canvasContainer.nativeElement);
  }

  private ensureSceneVisible(): void {
    if (!this.scene || !this.camera || !this.renderer) {
      console.log('Scene components missing, reinitializing...');
      this.reinitializeScene();
      return;
    }

    // Ensure animation is running
    if (this.isPaused) {
      console.log('Resuming 3D animation...');
      this.isPaused = false;
    }

    // Force a render to ensure visibility
    this.renderer.render(this.scene, this.camera);
  }

  private init3DScene(): void {
    try {
      console.log('Initializing 3D scene in About component...');
      
      // Check WebGL support
      if (!this.isWebGLSupported()) {
        console.warn('WebGL not supported, creating fallback scene');
        this.createFallbackScene();
        return;
      }

      const container = this.canvasContainer.nativeElement;
      const rect = container.getBoundingClientRect();
      
      // Ensure we have valid dimensions
      if (rect.width === 0 || rect.height === 0) {
        console.warn('Invalid container dimensions, using fallback');
        this.createFallbackScene();
        return;
      }
      
      // Create scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000011);

      // Create camera
      this.camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
      this.camera.position.set(0, 0, 30);

      // Create renderer with optimized settings
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: false, 
        alpha: true,
        powerPreference: "high-performance"
      });
      this.renderer.setSize(rect.width, rect.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      this.renderer.shadowMap.enabled = false; // Disable shadows for better performance
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Add context lost/restored event listeners
      this.renderer.domElement.addEventListener('webglcontextlost', (event) => {
        console.warn('WebGL context lost');
        event.preventDefault();
        this.isPaused = true;
      });
      
      this.renderer.domElement.addEventListener('webglcontextrestored', () => {
        console.log('WebGL context restored');
        this.reinitializeScene();
      });
      
      // Clear container and append renderer
      container.innerHTML = '';
      container.appendChild(this.renderer.domElement);

      // Create cosmic scene
      this.createOptimizedStarField();
      this.createSimplePlanets();

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      this.scene.add(directionalLight);

      // Add resize handler
      this.setupResizeHandler();

      console.log('3D scene initialized successfully in About component');
    } catch (error) {
      console.error('Error initializing 3D scene:', error);
      this.createFallbackScene();
    }
  }

  private setupResizeHandler(): void {
    const handleResize = () => {
      if (this.renderer && this.camera && this.canvasContainer?.nativeElement) {
        const container = this.canvasContainer.nativeElement;
        const rect = container.getBoundingClientRect();
        
        if (rect.width > 0 && rect.height > 0) {
          this.camera.aspect = rect.width / rect.height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(rect.width, rect.height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Store reference for cleanup
    (this as any).resizeHandler = handleResize;
  }

  private createOptimizedStarField(): void {
    console.log('Creating optimized starfield...');
    
    // Create a single optimized star field
    const starCount = 300; // Reduced for better performance
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Random position in a sphere
      const radius = 100 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Star colors
      const colorVariation = Math.random();
      if (colorVariation < 0.7) {
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorVariation < 0.9) {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 0.6 + Math.random() * 0.2;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i3 + 2] = 0.2 + Math.random() * 0.2;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }

  private createBasicStarField(): void {
    console.log('Creating realistic starfield...');
    
    // Create multiple layers of realistic stars
    this.createDistantStars();
    this.createCloseStars();
    this.createBrightStars();
  }

  private createDistantStars(): void {
    // Distant background stars
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Random position in a large sphere
      const radius = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Realistic star colors (blue-white to red)
      const colorVariation = Math.random();
      if (colorVariation < 0.7) {
        // Blue-white stars
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorVariation < 0.9) {
        // Yellow stars
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 0.6 + Math.random() * 0.2;
      } else {
        // Red stars
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i3 + 2] = 0.2 + Math.random() * 0.2;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }

  private createCloseStars(): void {
    // Closer, brighter stars
    const starCount = 200;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Closer positions
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Brighter colors
      const colorVariation = Math.random();
      if (colorVariation < 0.6) {
        colors[i3] = 0.9 + Math.random() * 0.1;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 1.0;
      } else if (colorVariation < 0.8) {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.95 + Math.random() * 0.05;
        colors[i3 + 2] = 0.7 + Math.random() * 0.2;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i3 + 2] = 0.3 + Math.random() * 0.2;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }

  private createBrightStars(): void {
    // Create individual bright stars with glow effects
    const brightStarCount = 20;
    
    for (let i = 0; i < brightStarCount; i++) {
      const starGroup = new THREE.Group();
      
      // Random position
      const radius = 30 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starGroup.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      // Create star geometry
      const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.9),
        transparent: true,
        opacity: 0.9
      });
      
      const star = new THREE.Mesh(starGeometry, starMaterial);
      starGroup.add(star);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.3, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: starMaterial.color,
        transparent: true,
        opacity: 0.3
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      starGroup.add(glow);
      
      starGroup.userData['isBrightStar'] = true;
      this.scene.add(starGroup);
    }
  }

  private createSimplePlanets(): void {
    console.log('Creating enhanced cosmic scene...');
    
    // Create an enhanced sun with glow effect
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffaa00,
      emissive: 0xff4400,
      emissiveIntensity: 0.3
    });
    
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    this.scene.add(sun);
    
    // Create planets
    const planets = [
      { name: 'Mercury', size: 0.3, distance: 8, color: 0x8c7853, speed: 0.02 },
      { name: 'Venus', size: 0.5, distance: 12, color: 0xffc649, speed: 0.015 },
      { name: 'Earth', size: 0.6, distance: 16, color: 0x6b93d6, speed: 0.01 },
      { name: 'Mars', size: 0.4, distance: 20, color: 0xc1440e, speed: 0.008 },
      { name: 'Jupiter', size: 1.2, distance: 28, color: 0xd8ca9d, speed: 0.005 },
      { name: 'Saturn', size: 1.0, distance: 36, color: 0xfad5a5, speed: 0.003 }
    ];
    
    planets.forEach((planetData, index) => {
      const planetGeometry = new THREE.SphereGeometry(planetData.size, 16, 16);
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetData.color,
        shininess: 30
      });
      
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(planetData.distance, 0, 0);
      planet.userData = { 
        originalDistance: planetData.distance, 
        speed: planetData.speed,
        name: planetData.name
      };
      
      this.scene.add(planet);
    });
  }

  private createNebulaClouds(): void {
    console.log('Creating improved nebula clouds...');
    
    // Create beautiful nebula clouds with better design
    const nebulaCount = 2; // Reduced quantity for better performance
    
    for (let i = 0; i < nebulaCount; i++) {
      const nebulaGroup = new THREE.Group();
      
      // Main nebula body
      const nebulaGeometry = new THREE.SphereGeometry(8 + Math.random() * 4, 16, 16);
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          0.6 + Math.random() * 0.3, // Purple to blue range
          0.8,
          0.3 + Math.random() * 0.2
        ),
        transparent: true,
        opacity: 0.1 + Math.random() * 0.1, // Lower opacity for better visibility
        side: THREE.DoubleSide
      });
      
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      nebula.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      nebula.scale.set(
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5
      );
      
      nebulaGroup.add(nebula);
      
      // Add detail clouds
      for (let j = 0; j < 3; j++) {
        const detailGeometry = new THREE.SphereGeometry(2 + Math.random() * 2, 8, 8);
        const detailMaterial = new THREE.MeshBasicMaterial({
          color: nebulaMaterial.color,
          transparent: true,
          opacity: 0.05 + Math.random() * 0.05
        });
        
        const detail = new THREE.Mesh(detailGeometry, detailMaterial);
        detail.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        );
        
        nebulaGroup.add(detail);
      }
      
      nebulaGroup.userData = { 
        isNebula: true,
        rotationSpeed: 0.001 + Math.random() * 0.002
      };
      
      this.scene.add(nebulaGroup);
    }
  }

  private animate(): void {
    // Always schedule the next frame first
    this.animationId = requestAnimationFrame(() => this.animate());

    // Check if we have valid scene components
    if (!this.scene || !this.camera || !this.renderer) {
      console.warn('Scene components missing, stopping animation');
      this.debugSceneState();
      return;
    }

    try {
      // Always render the scene, even when paused
      if (this.isPaused) {
        this.renderer.render(this.scene, this.camera);
        return;
      }

      // Animate planets
      this.scene.children.forEach(child => {
        if (child.userData && child.userData['speed']) {
          child.rotation.y += child.userData['speed'] * this.animationSpeed;
          
          // Update planet positions in orbit
          const distance = child.userData['originalDistance'];
          child.position.x = Math.cos(child.rotation.y) * distance;
          child.position.z = Math.sin(child.rotation.y) * distance;
        }
      });

      // Subtle camera movement for background effect
      this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.02;
      this.camera.position.y += (this.mouseY * 0.5 - this.camera.position.y) * 0.02;
      this.camera.lookAt(0, 0, 0);

      // Always render the scene
      this.renderer.render(this.scene, this.camera);
      
    } catch (error) {
      console.error('Error in animation loop:', error);
      this.debugSceneState();
      // Don't pause, just log the error and continue
      if (this.scene && this.camera && this.renderer) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  private animateParticles(): void {
    // Find and animate particle system
    this.scene.children.forEach(child => {
      if (child instanceof THREE.Points) {
        const positions = child.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.001;
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
  }

  private setupEventListeners(): void {
    console.log('Setting up cosmic background...');
    
    // Subtle mouse interaction for background effect
    const canvas = this.canvasContainer.nativeElement;

    // Mouse move for subtle camera movement
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2) * 0.3;
      this.mouseY = -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2) * 0.3;
    });
  }


  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    } else {
      console.warn(`Section with id '${sectionId}' not found`);
    }
  }
}
