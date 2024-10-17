// src/app/components/PeeqShopCofounderFocusDeck.tsx

'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Users,
  TrendingUp,
  PieChart,
  BarChart4,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Rating {
  loveDoingThis: number;
  amGoodAtThis: number;
  haveExperience: number;
}

interface RatingsState {
  [focusAreaKey: string]: {
    [bulletPointKey: string]: Rating;
  };
}

const FocusArea = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Icon className="mr-2" />
          {title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </CardHeader>
      {isExpanded && <CardContent>{children}</CardContent>}
    </Card>
  );
};

// Helper component for the rating sliders
const RatingSliders = ({
  focusAreaKey,
  bulletPointKey,
  ratings,
  setRatings,
}: {
  focusAreaKey: string;
  bulletPointKey: string;
  ratings: RatingsState;
  setRatings: React.Dispatch<React.SetStateAction<RatingsState>>;
}) => {
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: number | number[]
  ) => {
    if (typeof newValue !== 'number') return;

    // Determine which slider is being updated based on the event target's name
    const aspect = event.target.name as keyof Rating;

    setRatings((prevRatings) => ({
      ...prevRatings,
      [focusAreaKey]: {
        ...prevRatings[focusAreaKey],
        [bulletPointKey]: {
          ...prevRatings[focusAreaKey][bulletPointKey],
          [aspect]: newValue,
        },
      },
    }));
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          I love doing this
        </label>
        <Slider
          name="loveDoingThis"
          value={ratings[focusAreaKey][bulletPointKey]?.loveDoingThis || 0}
          onChange={handleSliderChange}
          min={0}
          max={10}
          step={1}
          valueLabelDisplay="on"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          I am good at this
        </label>
        <Slider
          name="amGoodAtThis"
          value={ratings[focusAreaKey][bulletPointKey]?.amGoodAtThis || 0}
          onChange={handleSliderChange}
          min={0}
          max={10}
          step={1}
          valueLabelDisplay="on"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Have prior experience doing it
        </label>
        <Slider
          name="haveExperience"
          value={ratings[focusAreaKey][bulletPointKey]?.haveExperience || 0}
          onChange={handleSliderChange}
          min={0}
          max={10}
          step={1}
          valueLabelDisplay="on"
        />
      </div>
    </div>
  );
};

const PeeqShopCofounderFocusDeck = () => {
  const [activeTab, setActiveTab] = useState('focus-areas');

  // Initialize ratings state
  const [ratings, setRatings] = useState<RatingsState>({});

  // Initialize email state
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    // Prepare data
    const data = {
      email,
      ratings,
    };

    // Send data to backend API
    try {
      const response = await fetch('/api/submit-ratings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Your ratings have been submitted successfully!');
        // Optionally, reset the form
        setEmail('');
        // Reset ratings to initial state
        initializeRatings();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'There was an error submitting your ratings.'}`);
      }
    } catch (error) {
      console.error('Error submitting ratings:', error);
      alert('There was an error submitting your ratings.');
    }
  };

  // Define your focus areas and bullet points
  const focusAreas = [
    {
      key: 'businessDevelopment',
      icon: Users,
      title: '1. Business Development and Partnerships',
      sections: [
        {
          title: 'Pilot Program Implementation',
          bulletPoints: [
            'Identify and secure pilot participants (local businesses and online sellers)',
            'Negotiate terms for pilot participation',
            'Manage relationships with pilot partners',
          ],
        },
        {
          title: 'Expand Network',
          bulletPoints: [
            "Build a network of local stores willing to adopt PeeqShop's technology",
            'Attract online sellers interested in leveraging local fulfillment centers',
          ],
        },
      ],
    },
    {
      key: 'salesMarketing',
      icon: TrendingUp,
      title: '2. Sales and Marketing Strategy',
      sections: [
        {
          title: 'Go-to-Market Plan',
          bulletPoints: [
            'Conduct market research to validate target market and understand customer needs',
            'Develop brand positioning and messaging',
            'Identify effective marketing channels',
          ],
        },
        {
          title: 'Customer Acquisition',
          bulletPoints: [
            'Implement strategies to attract early adopters',
            'Develop marketing materials and case studies',
          ],
        },
      ],
    },
    {
      key: 'fundraising',
      icon: PieChart,
      title: '3. Fundraising Preparation',
      sections: [
        {
          title: 'Investor Relations',
          bulletPoints: [
            'Create a compelling pitch deck',
            'Prepare detailed financial projections',
            'Network with potential investors',
          ],
        },
        {
          title: 'Funding Strategy',
          bulletPoints: [
            'Determine appropriate funding stage (Seed vs. Series A)',
            'Prepare for due diligence',
          ],
        },
      ],
    },
    {
      key: 'operationalSetup',
      icon: BarChart4,
      title: '4. Operational Setup for Scaling',
      sections: [
        {
          title: 'Process Development',
          bulletPoints: [
            'Establish standard operating procedures',
            'Plan logistics coordination',
          ],
        },
        {
          title: 'Legal and Compliance',
          bulletPoints: [
            'Draft and manage legal documents',
            'Ensure regulatory compliance',
          ],
        },
      ],
    },
    {
      key: 'dataAnalysis',
      icon: Briefcase,
      title: '5. Data Analysis and Feedback Loop',
      sections: [
        {
          title: 'Pilot Performance Metrics',
          bulletPoints: [
            'Implement data collection systems',
            'Analyze data to identify improvements',
            'Provide regular updates on KPIs',
          ],
        },
      ],
    },
  ];

  // Initialize ratings state structure
  const initializeRatings = () => {
    const initialRatings: RatingsState = {};
    focusAreas.forEach((area) => {
      initialRatings[area.key] = {};
      area.sections.forEach((section) => {
        section.bulletPoints.forEach((point, index) => {
          const bulletKey = `${section.title}-${index}`;
          initialRatings[area.key][bulletKey] = {
            loveDoingThis: 0,
            amGoodAtThis: 0,
            haveExperience: 0,
          };
        });
      });
    });
    setRatings(initialRatings);
  };

  useEffect(() => {
    initializeRatings();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">PeeqShop Co-founder Focus Areas</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="focus-areas">Focus Areas</TabsTrigger>
          <TabsTrigger value="context">Context & Next Steps</TabsTrigger>
        </TabsList>

        <TabsContent value="focus-areas">
          {focusAreas.map((area) => (
            <FocusArea key={area.key} icon={area.icon} title={area.title}>
              {area.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  {section.bulletPoints.map((point, pointIndex) => {
                    const bulletKey = `${section.title}-${pointIndex}`;
                    return (
                      <div key={bulletKey} className="mb-4">
                        <p className="text-md font-medium mb-2">{point}</p>
                        <RatingSliders
                          focusAreaKey={area.key}
                          bulletPointKey={bulletKey}
                          ratings={ratings}
                          setRatings={setRatings}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </FocusArea>
          ))}

          {/* Email input and submit button */}
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Submit Your Ratings</h2>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Submit
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="context">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Context and Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Current Stage:</h3>
                <p>MVP completed, focusing on building the product.</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Goals:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Reach Product-Market Fit through pilot programs.</li>
                  <li>Secure $10M in Seed or Series A funding within 3 months.</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Why This Co-founder Profile is Ideal:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Balances the team's strengths.</li>
                  <li>Enhances productivity and execution.</li>
                  <li>Brings industry advantage.</li>
                  <li>Mitigates challenges in follow-through.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">Next Steps to Find This Co-founder:</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Leverage your network.</li>
                  <li>Define clear roles and expectations.</li>
                  <li>Assess cultural fit.</li>
                  <li>Conduct due diligence.</li>
                  <li>Consider a trial period.</li>
                </ol>
              </section>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeeqShopCofounderFocusDeck;
