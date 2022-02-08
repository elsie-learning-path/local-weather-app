import { fakeWeather } from './../weather/weather.service.fake'
import { WeatherService } from './../weather/weather.service'

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurrentWeatherComponent } from './current-weather.component'
import { of } from 'rxjs'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>
  beforeEach(async () => {
    const WeatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: WeatherServiceSpy,
        },
      ],
    }).compileComponents()
    weatherServiceMock = TestBed.inject(WeatherService) as any
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges()
    // Assert
    expect(component).toBeTruthy()
  })

  it('should get CurrentWeather from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges()
    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))
    // Act
    fixture.detectChanges()
    // Assert
    expect(component.current).toBeDefined()
    expect(component.current.city).toEqual('Bethesda')
  })
})
