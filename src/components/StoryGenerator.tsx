import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Wand2, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StoryGenerator = () => {
  const [craftDetails, setCraftDetails] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateStory = async () => {
    if (!craftDetails.trim()) {
      toast({
        title: "Please describe your craft",
        description: "Tell us about your craft, materials, and traditions to generate a story.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const sampleStory = `Rooted in centuries-old tradition, this exquisite craft represents the timeless artistry of ${craftDetails}. Each piece tells a story of skilled hands working with natural materials, carrying forward the cultural heritage passed down through generations.

The intricate techniques used in creating this masterpiece have been preserved and perfected over time, making each creation unique and deeply meaningful. The artisan's dedication to authenticity ensures that every detail reflects the true essence of traditional craftsmanship.

This beautiful work not only showcases technical excellence but also embodies the rich cultural narrative that makes it truly special in today's modern world.`;
      
      setGeneratedStory(sampleStory);
      setIsGenerating(false);
      
      toast({
        title: "Story generated successfully!",
        description: "Your craft story is ready to share with the world.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStory);
    toast({
      title: "Copied to clipboard",
      description: "Story has been copied to your clipboard.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-bold">AI Story Generator</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your craft into compelling stories that connect with customers and preserve cultural heritage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-2">1</span>
            Describe Your Craft
          </h3>
          
          <Textarea
            placeholder="Tell us about your craft... What materials do you use? What traditions does it represent? What makes it special? Include details about techniques, cultural significance, and your personal journey as an artisan."
            value={craftDetails}
            onChange={(e) => setCraftDetails(e.target.value)}
            className="min-h-[200px] mb-4"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Traditional pottery
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Handwoven textiles
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Wood carving
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Jewelry making
            </Badge>
          </div>

          <Button 
            onClick={generateStory} 
            disabled={isGenerating}
            className="w-full"
            variant="heritage"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Story
              </>
            )}
          </Button>
        </Card>

        <Card className="p-6 bg-card border-border shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center">
            <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm mr-2">2</span>
            Your Generated Story
          </h3>
          
          {generatedStory ? (
            <div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[200px]">
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {generatedStory}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Story
                </Button>
                <Button 
                  onClick={generateStory}
                  variant="ghost"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
              <div>
                <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Your AI-generated story will appear here
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StoryGenerator;