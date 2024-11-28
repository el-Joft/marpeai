import { useState, useRef } from "react"
import { Link } from "../components/Link"
import AppLayout from "@/components/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, CheckCircle, ArrowRight, Utensils, BookOpen, Play, Pause } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { useFormData } from "@/context/FormDataContext"
import MarpeAiLogo from "@/components/Logo"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { formGlobalData } = useFormData(); // Get form data from context

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  return (
    <AppLayout>
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <Heart className="h-6 w-6 text-primary" /> */}
            <MarpeAiLogo 
              width={30}
              height={30} 
              className="logo" 
            />
            <span className="text-xl font-bold">Marpe AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#for-whom" className="text-sm font-medium hover:text-primary">For whom</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">How it works</a>
            {formGlobalData.questionnaireFilled ? (
              <Link href="/dashboard" className="btn btn-link"><Button>Dashboard</Button></Link>
            ): (
              <>
              <Link href="/account/login" className="btn btn-link"><Button variant="outline">Sign In</Button></Link>
              <Link href="/account/register" className="btn btn-link"><Button>Get Started</Button></Link>
              </>
            ) 
            }
            
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                AI-Powered Nutrition for Hypertension Management
              </h1>
              <p className="text-xl text-muted-foreground">
                Personalized meal planning and education to empower patients, healthcare providers, and nutritionists in managing hypertension effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/account/register"><Button size="lg" className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button></Link>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline">
                      Watch our story
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-play-fill"
                          viewBox="0 0 16 16"
                          style={{ marginRight: '8px' }} // Adds spacing between the icon and text
                        >
                          <path d="M11.596 8.004l-6-4a.5.5 0 0 0-.896.44v8a.5.5 0 0 0 .896.44l6-4a.5.5 0 0 0 0-.88z" />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[725px]">
                      <DialogHeader>
                        {/* <DialogTitle>Demo Video</DialogTitle> */}
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://res.cloudinary.com/fehintolu/video/upload/v1732822456/empowering-health-management-with-marpeai_bwjw4l.mp4"
                          title="Our story"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Personalized meal plans</span>
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>AI-driven insights</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://demo.cymolthemes.com/html/nutrivix/images/slides/vector-banner-single_img1.png"
                alt="Personalized Nutrition"
                width={600}
                height={400}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Hypertension Management</h2>
            <p className="text-xl text-muted-foreground">
              Empowering patients and healthcare providers with AI-driven nutrition solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Utensils className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Personalized Meal Planning</h3>
                <p className="text-muted-foreground">
                  Tailored dietary recommendations based on medical history, preferences, and progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Educational Resources</h3>
                <p className="text-muted-foreground">
                  Comprehensive tools to understand the impact of nutrition on blood pressure
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <Activity className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Health Outcome Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor progress and potentially reduce medication dependency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="for-whom" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Who Benefits from Marpe AI?</h2>
          <Tabs defaultValue="patients" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="providers">Healthcare Providers</TabsTrigger>
              <TabsTrigger value="insurance">Insurance Companies</TabsTrigger>
              <TabsTrigger value="nutritionists">Nutritionists</TabsTrigger>
            </TabsList>
            <TabsContent value="patients" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">For Patients with Hypertension</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Personalized meal plans tailored to your specific needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Educational resources to understand nutrition&apos;s impact on blood pressure</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Potential for improved health outcomes and reduced medication dependency</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <Image
                    src="https://demo.cymolthemes.com/html/nutrivix/images/single_image-01.png"
                    alt="Patient Benefits"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="providers" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="https://demo.cymolthemes.com/html/nutrivix/images/single_image-02.png"
                    alt="Healthcare Provider Benefits"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold mb-4">For Healthcare Providers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>AI-generated insights for more effective treatment plans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Automated dietary planning to improve care efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Tools to enhance patient engagement and compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insurance" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">For Insurance Companies</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Potential cost savings through prevention of hypertension complications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Support for value-based healthcare initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Data-driven approach to preventive care</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <Image
                    src="https://img.freepik.com/premium-vector/health-insurance-concept-flat-vector-illustration-landing-page-banner-web-design-business_566886-12867.jpg"
                    alt="Insurance Company Benefits"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="nutritionists" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="https://img.freepik.com/free-vector/people-eating-healthy-exercising-regularly_53876-64671.jpg"
                    alt="Nutritionist Benefits"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold mb-4">For Nutritionists and Dietitians</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>AI-enhanced tools for more precise and scalable dietary recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Opportunities to work with cutting-edge technology in nutrition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1" />
                      <span>Enhanced ability to deliver personalized care at scale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How Marpe AI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-xl font-bold">Data Collection</h3>
                <p className="text-muted-foreground">
                  Gather patient health data, preferences, and medical history
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI processes the data to generate personalized insights
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-xl font-bold">Meal Planning</h3>
                <p className="text-muted-foreground">
                  Create tailored meal plans based on AI recommendations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-xl font-bold">Continuous Monitoring</h3>
                <p className="text-muted-foreground">
                  Track progress and adjust plans for optimal results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story Video Section */}
      <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.jpg?height=720&width=1280"
                  alt="Video Thumbnail"
                  fill
                  // objectFit="cover"
                  style={{
                    objectFit: 'cover', // Use the objectFit style here
                    objectPosition: 'center', // Optionally set the object position (center, top, etc.)
                  }}
                  className={`transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src="https://res.cloudinary.com/fehintolu/video/upload/v1732822456/empowering-health-management-with-marpeai_bwjw4l.mp4"
                  poster="/placeholder.jpg?height=720&width=1280"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
                <Button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white rounded-full p-4"
                  onClick={toggleVideo}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Revolutionizing Hypertension Management</h3>
                <p className="text-muted-foreground">
                  Discover how Marpe AI is changing lives through personalized nutrition plan.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Journey to Better Health Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are taking control of their hypertension through personalized nutrition
          </p>
          <Link href="/account/register"><Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Marpe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </AppLayout>
  )
}